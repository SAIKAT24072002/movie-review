// import https from 'https';
// import fs from 'fs';
// import path from 'path';

// const posters = [
//   { id: 1, title: "RRR", url: "https://m.media-amazon.com/images/M/MV5BNWMwODYyMjQtMTczMi00NTQ1LWFkYjItMGJhMWRkY2E3NDAyXkEyXkFqcGc@._V1_SX400.jpg" },
//   { id: 2, title: "Baahubali 2", url: "https://m.media-amazon.com/images/M/MV5BNTRhYTlhZTgtYmMyYy00NWI4LTk4MzItOWM2YjBmYTg2OTI2XkEyXkFqcGc@._V1_SX400.jpg" },
//   { id: 3, title: "3 Idiots", url: "https://m.media-amazon.com/images/M/MV5BNzc4ZWQ3NmYtODE0Ny00YTQ4LTlkZWItNTBkMGQ0MmUwMmJlXkEyXkFqcGc@._V1_SX400.jpg" },
//   { id: 4, title: "Dangal", url: "https://m.media-amazon.com/images/M/MV5BMTQ4MzQzMzM2Nl5BMl5BanBnXkFtZTgwMTQ1NzU3MDI@._V1_SX400.jpg" },
//   { id: 5, title: "KGF Chapter 2", url: "https://m.media-amazon.com/images/M/MV5BZmQzZjVkZTUtYjI4ZC00ZDJmLWI0ZDUtZTFmMGM1Mzc5ZjIyXkEyXkFqcGc@._V1_SX400.jpg" },
//   { id: 6, title: "Jawan", url: "https://m.media-amazon.com/images/M/MV5BMGExNGI1NDktOWI2Mi00NDM3LWIxMmQtNTQxYTgzMzI0MTA1XkEyXkFqcGc@._V1_SX400.jpg" },
//   { id: 7, title: "Tumbbad", url: "https://m.media-amazon.com/images/M/MV5BOTY0YzY3MTMtOWQ5Yi00ODY2LThhOGMtMzFlMjhlODcxOGU1XkEyXkFqcGc@._V1_SX400.jpg" },
//   { id: 8, title: "Pathaan", url: "https://m.media-amazon.com/images/M/MV5BNDdkNTY1MDQtY2I5MC00OTFlLTg5OWQtZWE2YzE5NWFiMDgzXkEyXkFqcGc@._V1_SX400.jpg" },
//   { id: 9, title: "Vikram", url: "https://m.media-amazon.com/images/M/MV5BMmViYjExY2UtMzZjOS00OGQ2LWEzNWYtNGYxY2NkY2RmMDE3XkEyXkFqcGc@._V1_SX400.jpg" },
//   { id: 10, title: "Drishyam 2", url: "https://m.media-amazon.com/images/M/MV5BNGYyY2I5MzktMDg2MC00Nzc4LWIwNmYtMjg3NzE1ODQyMDllXkEyXkFqcGc@._V1_SX400.jpg" },
//   { id: 11, title: "Kantara", url: "https://m.media-amazon.com/images/M/MV5BY2VkZjk5ZjMtM2ExOS00ZDA1LTg1ZDEtYTliNGZiYTc4ZWZiXkEyXkFqcGc@._V1_SX400.jpg" },
//   { id: 12, title: "Gangs of Wasseypur", url: "https://m.media-amazon.com/images/M/MV5BMTc5NjY4MjUwNF5BMl5BanBnXkFtZTgwODM3NzM5MzE@._V1_SX400.jpg" },
//   { id: 13, title: "PK", url: "https://m.media-amazon.com/images/M/MV5BMTYzOTE2NjkxN15BMl5BanBnXkFtZTgwMDgzMTg0MzE@._V1_SX400.jpg" },
//   { id: 14, title: "Animal", url: "https://m.media-amazon.com/images/M/MV5BZThmNDg1NjUtNWJhMC00YjA3LWJiMjItNmM4ZDQ5ZGZiN2Y2XkEyXkFqcGc@._V1_SX400.jpg" },
//   { id: 15, title: "Ponniyin Selvan", url: "https://m.media-amazon.com/images/M/MV5BYjI2ZmRmODEtZmEyYS00OWY3LTlhNWEtODhlZjQyNjVlMWU0XkEyXkFqcGc@._V1_SX400.jpg" },
//   { id: 16, title: "ZNMD", url: "https://m.media-amazon.com/images/M/MV5BOGIzYzg5NzItNDRkYS00NmIzLTk3NzQtZWYwY2VlZDhiYWQ4XkEyXkFqcGc@._V1_SX400.jpg" },
//   { id: 17, title: "Stree 2", url: "https://m.media-amazon.com/images/M/MV5BMTA1NmUxYzItZmVmNy00YmQxLTk4Y2UtZjVkMWUwMWQ5N2IxXkEyXkFqcGc@._V1_SX400.jpg" },
//   { id: 18, title: "Pushpa", url: "https://m.media-amazon.com/images/M/MV5BOWE4YWEyNjYtMWFiNC00M2IzLWE3ZGMtMjQ0ZGEyOWI1YjAzXkEyXkFqcGc@._V1_SX400.jpg" },
// ];

// const dir = path.join(process.cwd(), 'public', 'posters');

// function download(url, dest) {
//   return new Promise((resolve, reject) => {
//     const file = fs.createWriteStream(dest);
//     https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
//       if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
//         // Follow redirect
//         https.get(res.headers.location, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res2) => {
//           res2.pipe(file);
//           file.on('finish', () => { file.close(); resolve(); });
//         }).on('error', reject);
//       } else if (res.statusCode === 200) {
//         res.pipe(file);
//         file.on('finish', () => { file.close(); resolve(); });
//       } else {
//         reject(new Error(`HTTP ${res.statusCode} for ${url}`));
//       }
//     }).on('error', reject);
//   });
// }

// (async () => {
//   for (const p of posters) {
//     const dest = path.join(dir, `${p.id}.jpg`);
//     try {
//       await download(p.url, dest);
//       const stats = fs.statSync(dest);
//       console.log(`✓ ${p.id}. ${p.title} - ${(stats.size / 1024).toFixed(0)}KB`);
//     } catch (e) {
//       console.log(`✗ ${p.id}. ${p.title} - FAILED: ${e.message}`);
//     }
//   }
//   console.log('\nDone!');
// })();
