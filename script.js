document.addEventListener('DOMContentLoaded', ()=>{
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const scoreElement = document.getElementById('score');

    let circles = []
    let nextId = 0
    let score = 0

    function startGame(){
        setInterval(() =>{
            addCircle()
        }, 1000);

        requestAnimationFrame(updateCanvas);
    }

    function addCircle(){
        const radius = 25;
        const x = Math.random() * (canvas.width - 2 * radius) + radius;
        const y = Math.random() * (canvas.height - 2 * radius) + radius;
        const startTime = performance.now()
        const newCircle= {
            id : nextId++,
            x,
            y,
            radius,
            timeoutId : null,
            startTime
        }

        newCircle.timeoutId = setTimeout(() =>{
            removeCirle(newCircle.id)
        },3000)

        circles.push(newCircle);
    }


    function removeCirle(id){
        const cirleIndex = circles.findIndex(circle => circle.id === id);

        if(cirleIndex !== -1){
            clearTimeout(circles[cirleIndex].timeoutId);
            circles.splice(cirleIndex, 1)
        }
    }

    canvas.addEventListener('click', (event) => {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        for(const circle of circles){
            const distance = Math.sqrt((circle.x - x) ** 2 + (circle.y - y) ** 2);
            if (distance < circle.radius) {
                removeCirle(circle.id);
                score++;
                scoreElement.textContent = score;
                break;
            }
        }
    })

    function updateCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    
        const now = performance.now();
    
        for (const circle of circles) {
          const elapsed = now - circle.startTime;
          const progress = Math.min(elapsed / 500, 1); // Animate over 500ms
          drawCircle(circle, progress);
        }
    
        requestAnimationFrame(updateCanvas);
      }
    
      function drawCircle(circle, progress) {
        const currentRadius = circle.radius * progress;
    
        ctx.beginPath();
        ctx.arc(circle.x, circle.y, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = 'red';
        ctx.fill();
        ctx.closePath();
      }
    
      startGame();
    }
)