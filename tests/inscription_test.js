import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    stages: [
        { duration: '30s', target: 50 },  // 50 usuarios en 30s
        { duration: '30s', target: 100 }, // 100 usuarios en 30s más
        { duration: '30s', target: 200 }, // 200 usuarios en 30s más
    ],
};

export default function () {

    const url = 'http://192.168.0.160:3000/api/inscription';
    const payload = JSON.stringify({
        name: `Usuario_${Math.random().toString(36).substring(7)}`,
        email: `user${Math.floor(Math.random() * 100000)}@test.com`,
    });

    const params = {
        headers: { 'Content-Type': 'application/json' },
    };

    const res = http.post(url, payload, params);

    check(res, {
        'status es 200': (r) => r.status === 200,
    });

    sleep(0.1); // Pequeña pausa entre solicitudes
}

/*
 Descripcion

 🧐 ¿Qué hace exactamente?

🔹 600 usuarios virtuales simultáneos (vus) → Están activos todo el tiempo.
🔹 Cada usuario envía una solicitud POST → A http://localhost:3000/api/inscription.
🔹 Cada usuario espera 0.1 segundos (sleep(0.1)) entre solicitudes.
🔹 Duración de la prueba: 5 minutos → Después de esto, k6 termina la ejecución.

🛠️ ¿Cuántas requests se generan?

Para calcularlo:

    600 usuarios → Haciendo solicitudes continuamente.
    Cada usuario envía 1 request cada 0.1 segundos (10 requests por segundo).
    En total, la prueba dura 300 segundos (5 minutos).

🔢 Total de requests estimadas:
📌 600 usuarios × 10 requests/seg × 300 seg = 1,800,000 requests en 5 minutos
*/


/*
RESULTADOS:  
    ✗ status es 200
     ↳  28% — ✓ 1027 / ✗ 2576

    checks.........................: 28.50% 1027 out of 3603
    data_received..................: 2.1 MB 6.3 kB/s
    data_sent......................: 741 kB 2.3 kB/s
    http_req_blocked...............: avg=15.11ms min=0s     med=0s      max=192.73ms p(90)=78.97ms p(95)=118.84ms
    http_req_connecting............: avg=14.9ms  min=0s     med=0s      max=192.73ms p(90)=78.97ms p(95)=117.56ms
    http_req_duration..............: avg=53.49s  min=27.41s med=56.58s  max=1m0s     p(90)=1m0s    p(95)=1m0s   

      { expected_response:true }...: avg=50.47s  min=27.41s med=54s     max=59.99s   p(90)=58.43s  p(95)=59.05s 

    http_req_failed................: 71.49% 2576 out of 3603
    http_req_receiving.............: avg=1.16ms  min=0s     med=198.4µs max=20.29ms  p(90)=3.26ms  p(95)=4.51ms 

    http_req_sending...............: avg=1.4ms   min=0s     med=0s      max=101.57ms p(90)=743.5µs p(95)=6.66ms 

    http_req_tls_handshaking.......: avg=0s      min=0s     med=0s      max=0s       p(90)=0s      p(95)=0s     

    http_req_waiting...............: avg=53.48s  min=27.41s med=56.58s  max=1m0s     p(90)=1m0s    p(95)=1m0s   

    http_reqs......................: 3603   11.025785/s
    iteration_duration.............: avg=53.61s  min=27.57s med=56.68s  max=1m0s     p(90)=1m0s    p(95)=1m0s   

    iterations.....................: 3603   11.025785/s
    vus............................: 122    min=122          max=600
    vus_max........................: 600    min=600          max=600

*/