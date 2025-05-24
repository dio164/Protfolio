const ctx = document.getElementById('myChart');
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Mon', 'Tue', 'Wed', 'Thus', 'Fri', 'Sat', 'Sun'],
      datasets: [{
        data: [125, 154, 196, 241, 163, 210, 300],
        fill: true,
        borderWidth: 1,
        showLine: true,
        tension: 0.5,
        borderColor: '#5c85e7',
        backgroundColor: 'rgba(141, 141, 141, 0.1)',
        pointBorderWidth: 3,
        pointBackgroundColor: 'rgba(255, 255, 255, 1)',
      }]
    },
    options: {
        plugins: {
            legend: {
                display: false
            },
        },
      scales: {
        y: {
          min: 100,
          max:300,
          beginAtZero: false,
          offset: true,
          grid: {
            display: true,
            borderDash: [5, 5],
            color: 'rgba(141, 141, 141, 0.1)',
          },
          ticks: {
            stepSize: 50,
            font: {
                size: 12,
                weight: 'bold',
            }
        }
        },
        x: {
            offset: true
        },
      },
    }
  });

  document.addEventListener('DOMContentLoaded', function() {
    const navBtn = document.getElementById('nav-btn');
    const sidebar = document.querySelector('.sidebar-overlay');
    const closeBTn = document.getElementById('close-btn');

    let statsBtn = document.getElementById('statistics-icon');
    let statsBtnMobile = document.getElementById('phone-statistics-icon');

    statsBtn.addEventListener('click', function () {
      console.log('I work!');
    })

    statsBtnMobile.addEventListener('click', function () {
      console.log('I work!');
    })
  

    function showSidebar() {
        sidebar.classList.add('show');
    }

    function hideSidebar () {
      sidebar.classList.remove('show');
    }

    navBtn.addEventListener('click', showSidebar);
    closeBTn.addEventListener('click',hideSidebar);
});






