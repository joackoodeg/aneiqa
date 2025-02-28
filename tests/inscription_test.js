import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    stages: [
        { duration: '1m', target: 100 },  // Simulación de 800 usuarios en 5 minutos
    ],
};

export default function () {
    const url = 'http://192.168.0.160:3000/api/inscription';

    // 🔹 Generar datos válidos
    const randomName = `Usuario_${Math.random().toString(36).substring(7)}`;
    const randomEmail = `user${Math.floor(Math.random() * 100000)}@test.com`;

    if (!randomName || !randomEmail) {
        console.error("❌ Error: Datos generados inválidos.");
    }

    const payload = JSON.stringify({ name: randomName, email: randomEmail });

    if (!payload) {
        console.error("❌ Error: Datos generados inválidos.");
        return; // Evitar enviar datos inválidos
    }

    const params = {
        headers: { 'Content-Type': 'application/json' },
    };

    const res = http.post(url, payload, params);

    console.log(`📤 Enviado: ${payload} | 📥 Respuesta: ${res.status}`);

    check(res, {
        '✅ Status es 202 - 400': (r) => r.status === 202 || r.status === 400,
    });

    sleep(30); // Pequeña pausa entre solicitudes
}

/*

Descripcion

🧐 ¿Qué hace exactamente?

🔹 X usuarios virtuales simultáneos (vus) → Están activos todo el tiempo.
🔹 Cada usuario envía una solicitud POST → A http://localhost:3000/api/inscription.
🔹 Cada usuario espera 30 segundos (sleep(10)) entre solicitudes.
🔹 Duración de la prueba: 5 minutos → Después de esto, k6 termina la ejecución.
*/

/*
    600 USUARIOS (5m - sleep(30)) - paquetes de 10 cada 5 segundos: 
    ✓ status es 202 - 400 

     checks.........................: 100.00% 3290 out of 3290
     data_received..................: 1.0 MB  3.2 kB/s
     data_sent......................: 677 kB  2.1 kB/s
     http_req_blocked...............: avg=62.68µs  min=0s      med=0s       max=7.97ms   p(90)=185.7µs  p(95)=227.36µs
     http_req_connecting............: avg=60.06µs  min=0s      med=0s       max=7.97ms   p(90)=183.32µs p(95)=221.45µs
     http_req_duration..............: avg=129.95ms min=44.64ms med=84.07ms  max=890.68ms p(90)=262.14ms p(95)=416.95ms
       { expected_response:true }...: avg=129.95ms min=44.64ms med=84.07ms  max=890.68ms p(90)=262.14ms p(95)=416.95ms
     http_req_failed................: 0.00%   0 out of 3290
     http_req_receiving.............: avg=394.35µs min=0s      med=359.55µs max=1.02ms   p(90)=882.1µs  p(95)=955.71µs
     http_req_sending...............: avg=6.24µs   min=0s      med=0s       max=1ms      p(90)=0s       p(95)=0s
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s       p(95)=0s
     http_req_waiting...............: avg=129.55ms min=44.08ms med=83.7ms   max=890.42ms p(90)=262.08ms p(95)=416.72ms
     http_reqs......................: 3290    9.974213/s
     iteration_duration.............: avg=30.13s   min=30.04s  med=30.08s   max=30.89s   p(90)=30.26s   p(95)=30.41s
     iterations.....................: 3290    9.974213/s
     vus............................: 23      min=2            max=599
     vus_max........................: 600     min=600          max=600

*/

/*
    600 USUARIOS (10m - sleep(30)) - paquetes de 10 cada 5 segundos: 
     ✓ ✅ Status es 202 - 400

     checks.........................: 100.00% 6240 out of 6240
     data_received..................: 2.0 MB  3.1 kB/s
     data_sent......................: 1.3 MB  2.0 kB/s
     http_req_blocked...............: avg=96.75µs  min=0s      med=0s       max=28.57ms p(90)=233.51µs p(95)=300.32µs
     http_req_connecting............: avg=92.52µs  min=0s      med=0s       max=28.57ms p(90)=229.5µs  p(95)=284.84µs
     http_req_duration..............: avg=339ms    min=47.68ms med=244ms    max=3.26s   p(90)=727.34ms p(95)=907.27ms
       { expected_response:true }...: avg=339ms    min=47.68ms med=244ms    max=3.26s   p(90)=727.34ms p(95)=907.27ms
     http_req_failed................: 0.00%   0 out of 6240
     http_req_receiving.............: avg=400.47µs min=0s      med=374.35µs max=1.2ms   p(90)=892.33µs p(95)=960.7µs
     http_req_sending...............: avg=11.04µs  min=0s      med=0s       max=8ms     p(90)=0s       p(95)=0s
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s      p(90)=0s       p(95)=0s
     http_req_waiting...............: avg=338.59ms min=46.7ms  med=243.61ms max=3.26s   p(90)=726.92ms p(95)=906.58ms
     http_reqs......................: 6240    9.904762/s
     iteration_duration.............: avg=30.34s   min=30.04s  med=30.24s   max=33.26s  p(90)=30.72s   p(95)=30.9s
     iterations.....................: 6234    9.895238/s
     vus............................: 8       min=1            max=599
     vus_max........................: 600     min=600          max=600
*/

/*

     ✓ ✅ Status es 202 - 400

     checks.........................: 100.00% 6197 out of 6197
     data_received..................: 2.0 MB  3.1 kB/s
     data_sent......................: 1.3 MB  2.0 kB/s
     http_req_blocked...............: avg=98.58µs  min=0s      med=0s       max=10.01ms p(90)=239µs    p(95)=337.15µs
     http_req_connecting............: avg=92.49µs  min=0s      med=0s       max=10.01ms p(90)=233.94µs p(95)=305.37µs
     http_req_duration..............: avg=591.16ms min=47.54ms med=269.29ms max=4.48s   p(90)=1.46s    p(95)=2.26s
       { expected_response:true }...: avg=591.16ms min=47.54ms med=269.29ms max=4.48s   p(90)=1.46s    p(95)=2.26s
     http_req_failed................: 0.00%   0 out of 6197
     http_req_receiving.............: avg=377.53µs min=0s      med=322.7µs  max=4ms     p(90)=886.6µs  p(95)=955.33µs
     http_req_sending...............: avg=14.12µs  min=0s      med=0s       max=6.62ms  p(90)=0s       p(95)=0s
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s      p(90)=0s       p(95)=0s
     http_req_waiting...............: avg=590.76ms min=46.79ms med=269.03ms max=4.48s   p(90)=1.46s    p(95)=2.26s
     http_reqs......................: 6197    9.836497/s
     iteration_duration.............: avg=30.55s   min=30.04s  med=30.26s   max=34.11s  p(90)=31.36s   p(95)=31.96s
     iterations.....................: 6123    9.719037/s
     vus............................: 74      min=1            max=599
     vus_max........................: 600     min=600          max=600


running (10m30.0s), 000/600 VUs, 6123 complete and 74 interrupted iterations
*/

/*
800 (5m - sleep(30)) - paquetes de 10 cada 5 segundos: 

     ✓ ✅ Status es 202 - 400

     checks.........................: 100.00% 8746 out of 8746
     data_received..................: 1.4 MB  4.2 kB/s
     data_sent......................: 899 kB  2.7 kB/s
     http_req_blocked...............: avg=112.65µs min=0s      med=0s      max=18.46ms p(90)=244.68µs p(95)=347.55µs
     http_req_connecting............: avg=106.26µs min=0s      med=0s      max=17.46ms p(90)=239.8µs  p(95)=291.69µs
     http_req_duration..............: avg=255.31ms min=45.59ms med=95.85ms max=1.5s    p(90)=698.57ms p(95)=1s
       { expected_response:true }...: avg=255.31ms min=45.59ms med=95.85ms max=1.5s    p(90)=698.57ms p(95)=1s
     http_req_failed................: 0.00%   0 out of 4373
     http_req_receiving.............: avg=389µs    min=0s      med=357.1µs max=1.33ms  p(90)=881.66µs p(95)=954.94µs
     http_req_sending...............: avg=13.35µs  min=0s      med=0s      max=2.35ms  p(90)=0s       p(95)=0s
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s      max=0s      p(90)=0s       p(95)=0s
     http_req_waiting...............: avg=254.91ms min=45.58ms med=95.23ms max=1.5s    p(90)=698.57ms p(95)=1s
     http_reqs......................: 4373    13.251471/s
     iteration_duration.............: avg=30.25s   min=30.04s  med=30.09s  max=31.5s   p(90)=30.69s   p(95)=31s
     iterations.....................: 4368    13.236319/s
     vus............................: 7       min=3            max=799
     vus_max........................: 800     min=800          max=800
*/

/*
1000  (5m - sleep(30)) - paquetes de 10 cada 5 segundos:
   ✓ ✅ Status es 202 - 400

     checks.........................: 100.00% 5463 out of 5463
     data_received..................: 1.7 MB  5.2 kB/s
     data_sent......................: 1.1 MB  3.4 kB/s
     http_req_blocked...............: avg=107.97µs min=0s      med=0s       max=20.1ms p(90)=245.78µs p(95)=311.89µs
     http_req_connecting............: avg=103.31µs min=0s      med=0s       max=20.1ms p(90)=240.36µs p(95)=289.39µs
     http_req_duration..............: avg=692.34ms min=45.58ms med=203.64ms max=5.12s  p(90)=2.52s    p(95)=3.79s
       { expected_response:true }...: avg=692.34ms min=45.58ms med=203.64ms max=5.12s  p(90)=2.52s    p(95)=3.79s
     http_req_failed................: 0.00%   0 out of 5463
     http_req_receiving.............: avg=385.68µs min=0s      med=340.3µs  max=8ms    p(90)=890.16µs p(95)=964.93µs
     http_req_sending...............: avg=11.23µs  min=0s      med=0s       max=1ms    p(90)=0s       p(95)=0s
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s     p(90)=0s       p(95)=0s
     http_req_waiting...............: avg=691.94ms min=45.58ms med=203.41ms max=5.12s  p(90)=2.52s    p(95)=3.79s
     http_reqs......................: 5463    16.554497/s
     iteration_duration.............: avg=30.58s   min=30.04s  med=30.19s   max=34.79s p(90)=31.44s   p(95)=33.13s
     iterations.....................: 5299    16.057529/s
     vus............................: 166     min=4            max=999
     vus_max........................: 1000    min=1000         max=1000
*/

/*
RESULTADOS:  
    -- 100 Usuarios virtuales simultáneos, 30 segundos por solicitud, 5 minutos de prueba :
     ✓ status es 202 - 400 

     checks.........................: 100.00% 549 out of 549
     data_received..................: 174 kB  526 B/s
     data_sent......................: 113 kB  342 B/s
     http_req_blocked...............: avg=60.64µs  min=0s      med=0s       max=1.51ms   p(90)=196.02µs p(95)=241.56µs
     http_req_connecting............: avg=57.68µs  min=0s      med=0s       max=1.51ms   p(90)=192.94µs p(95)=238.02µs
     http_req_duration..............: avg=54.65ms  min=47.17ms med=50.16ms  max=527.58ms p(90)=55.96ms  p(95)=66.66ms
       { expected_response:true }...: avg=54.65ms  min=47.17ms med=50.16ms  max=527.58ms p(90)=55.96ms  p(95)=66.66ms
     http_req_failed................: 0.00%   0 out of 549
     http_req_receiving.............: avg=384.18µs min=0s      med=302.59µs max=1.01ms   p(90)=903.87µs p(95)=982µs
     http_req_sending...............: avg=4.91µs   min=0s      med=0s       max=590.4µs  p(90)=0s       p(95)=0s
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s       p(95)=0s
     http_req_waiting...............: avg=54.26ms  min=46.5ms  med=49.78ms  max=527.58ms p(90)=55.93ms  p(95)=65.88ms
     http_reqs......................: 549     1.664665/s
     iteration_duration.............: avg=30.05s   min=30.04s  med=30.05s   max=30.52s   p(90)=30.05s   p(95)=30.06s
     iterations.....................: 549     1.664665/s
     vus............................: 4       min=1          max=99
     vus_max........................: 100     min=100        max=100
*/

/*
200 usuarios:

 ✓ status es 202 - 400 

     checks.........................: 100.00% 1099 out of 1099
     data_received..................: 347 kB  1.1 kB/s
     data_sent......................: 226 kB  685 B/s
     http_req_blocked...............: avg=59.06µs  min=0s      med=0s      max=2.1ms    p(90)=195.68µs p(95)=236.6µs
     http_req_connecting............: avg=55.9µs   min=0s      med=0s      max=2.1ms    p(90)=194.54µs p(95)=232.59µs
     http_req_duration..............: avg=60.28ms  min=44.56ms med=52.04ms max=621.41ms p(90)=61.06ms  p(95)=79.25ms
       { expected_response:true }...: avg=60.28ms  min=44.56ms med=52.04ms max=621.41ms p(90)=61.06ms  p(95)=79.25ms
     http_req_failed................: 0.00%   0 out of 1099
     http_req_receiving.............: avg=398.71µs min=0s      med=386µs   max=1.43ms   p(90)=897.86µs p(95)=971.39µs
     http_req_sending...............: avg=7.24µs   min=0s      med=0s      max=1ms      p(90)=0s       p(95)=0s
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s      max=0s       p(90)=0s       p(95)=0s
     http_req_waiting...............: avg=59.87ms  min=43.62ms med=51.58ms max=620.74ms p(90)=60.61ms  p(95)=78.42ms
     http_reqs......................: 1099    3.330729/s
     iteration_duration.............: avg=30.06s   min=30.04s  med=30.05s  max=30.62s   p(90)=30.06s   p(95)=30.08s
     iterations.....................: 1099    3.330729/s
     vus............................: 9       min=1            max=199
     vus_max........................: 200     min=200          max=200

300 USUARIOS


     ✓ status es 202 - 400 

     checks.........................: 100.00% 1649 out of 1649
     data_received..................: 521 kB  1.6 kB/s
     data_sent......................: 339 kB  1.0 kB/s
     http_req_blocked...............: avg=69.24µs  min=0s      med=0s      max=2.82ms   p(90)=194.32µs p(95)=237.52µs
     http_req_connecting............: avg=66.76µs  min=0s      med=0s      max=1.5ms    p(90)=193.89µs p(95)=235.67µs
     http_req_duration..............: avg=74.65ms  min=44.26ms med=58.45ms max=638.49ms p(90)=104.38ms p(95)=159.52ms
       { expected_response:true }...: avg=74.65ms  min=44.26ms med=58.45ms max=638.49ms p(90)=104.38ms p(95)=159.52ms
     http_req_failed................: 0.00%   0 out of 1649
     http_req_receiving.............: avg=402.64µs min=0s      med=379.9µs max=1.03ms   p(90)=885.42µs p(95)=964.95µs
     http_req_sending...............: avg=2.52µs   min=0s      med=0s      max=543µs    p(90)=0s       p(95)=0s
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s      max=0s       p(90)=0s       p(95)=0s
     http_req_waiting...............: avg=74.24ms  min=43.32ms med=58.1ms  max=638.49ms p(90)=103.86ms p(95)=159ms
     http_reqs......................: 1649    4.99696/s
     iteration_duration.............: avg=30.07s   min=30.04s  med=30.05s  max=30.63s   p(90)=30.1s    p(95)=30.16s
     iterations.....................: 1648    4.99393/s
     vus............................: 1       min=1            max=299
     vus_max........................: 300     min=300          max=300

     SLEEP (10) -> 1 SOLICITUD X USUARIO CADA 10 SEGUNDOS

        ✓ status es 202 - 400 

     checks.........................: 100.00% 6834 out of 6834
     data_received..................: 2.2 MB  6.8 kB/s
     data_sent......................: 1.4 MB  4.4 kB/s
     http_req_blocked...............: avg=159.84µs min=0s      med=0s      max=22.41ms p(90)=284.88µs p(95)=550.03µs
     http_req_connecting............: avg=146.65µs min=0s      med=0s      max=22.41ms p(90)=263.33µs p(95)=527.1µs
     http_req_duration..............: avg=4.02s    min=44.56ms med=2.7s    max=13.34s  p(90)=10.94s   p(95)=11.76s
       { expected_response:true }...: avg=4.02s    min=44.56ms med=2.7s    max=13.34s  p(90)=10.94s   p(95)=11.76s
     http_req_failed................: 0.00%   0 out of 6834
     http_req_receiving.............: avg=391.88µs min=0s      med=358.1µs max=5.55ms  p(90)=893.53µs p(95)=970µs
     http_req_sending...............: avg=18.64µs  min=0s      med=0s      max=12.26ms p(90)=0s       p(95)=0s
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s      max=0s      p(90)=0s       p(95)=0s
     http_req_waiting...............: avg=4.02s    min=44.52ms med=2.7s    max=13.34s  p(90)=10.94s   p(95)=11.76s
     http_reqs......................: 6834    21.626892/s
     iteration_duration.............: avg=14.03s   min=10.04s  med=12.7s   max=23.34s  p(90)=20.94s   p(95)=21.76s
     iterations.....................: 6834    21.626892/s
     vus............................: 10      min=2            max=599
     vus_max........................: 600     min=600          max=600
*/