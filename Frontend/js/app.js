
const util = (() => {

    const opacity = (nama) => {
        let nm = document.getElementById(nama);
        let op = parseInt(nm.style.opacity);
        let clear = null;

        clear = setInterval(() => {
            if (op >= 0) {
                nm.style.opacity = op.toString();
                op -= 0.025;
            } else {
                clearInterval(clear);
                clear = null;
                nm.remove();
                return;
            }
        }, 10);
    };

    const escapeHtml = (unsafe) => {
        return unsafe
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    };

    const salin = (btn, msg = 'Tersalin', timeout = 1500) => {
        navigator.clipboard.writeText(btn.getAttribute('data-nomer'));

        let tmp = btn.innerHTML;
        btn.innerHTML = msg;
        btn.disabled = true;

        let clear = null;
        clear = setTimeout(() => {
            btn.innerHTML = tmp;
            btn.disabled = false;
            btn.focus();

            clearTimeout(clear);
            clear = null;
            return;
        }, timeout);
    };

    const timer = () => {
        let countDownDate = (new Date(document.getElementById('tampilan-waktu').getAttribute('data-waktu').replace(' ', 'T'))).getTime();

        setInterval(() => {
            let distance = Math.abs(countDownDate - (new Date()).getTime());

            let days = Math.floor(distance / (1000 * 60 * 60 * 24));
            if(days < 10) {
                days = `0${days}`;
            }

            let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            if(hours < 10) {
                hours = `0${hours}`;
            }

            let mins = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            if(mins < 10) {
                mins = `0${mins}`;
            }
            
            let sec = Math.floor((distance % (1000 * 60)) / 1000);
            if(sec < 10) {
                sec = `0${sec}`;
            }

            document.getElementById('days').innerText = Math.floor(days);
            document.getElementById('hours').innerText = hours;
            document.getElementById('min').innerText = mins;
            document.getElementById('sec').innerText = sec;
        }, 1000);
    };

    const music = (btn) => {
        if (btn.getAttribute('data-status') !== 'true') {
            btn.setAttribute('data-status', 'true');
            audio.play();
            btn.innerHTML = '<i class="fa-solid fa-circle-pause spin-button"></i>';
        } else {
            btn.setAttribute('data-status', 'false');
            audio.pause();
            btn.innerHTML = '<i class="fa-solid fa-circle-play"></i>';
        }
    };

    const modal = (img) => {
        document.getElementById('show-modal-image').src = img.src;
        (new bootstrap.Modal('#modal-image')).show();
    };

    const animation = async () => {
        const duration = 10 * 1000;
        const animationEnd = Date.now() + duration;
        let skew = 1;

        let randomInRange = (min, max) => {
            return Math.random() * (max - min) + min;
        };

        (async function frame() {
            const timeLeft = animationEnd - Date.now();
            const ticks = Math.max(200, 500 * (timeLeft / duration));

            skew = Math.max(0.8, skew - 0.001);

            await confetti({
                particleCount: 1,
                startVelocity: 0,
                ticks: ticks,
                origin: {
                    x: Math.random(),
                    y: Math.random() * skew - 0.2,
                },
                colors: ["FFC0CB", "FF69B4", "FF1493", "C71585"],
                shapes: ["heart"],
                gravity: randomInRange(0.5, 1),
                scalar: randomInRange(1, 2),
                drift: randomInRange(-0.5, 0.5),
            });

            if (timeLeft > 0) {
                requestAnimationFrame(frame);
            }
        })();
    };

    const buka = async (button) => {
        fetchData();
        button.disabled = true;
        document.querySelector('body').style.overflowY = 'scroll';
        AOS.init();
        audio.play();

        opacity('welcome');
        document.getElementById('tombol-musik').style.display = 'block';
        timer();

        await confetti({
            origin: { y: 0.8 },
            zIndex: 1057
        });
        await animation();
    };

    const show = () => {
        opacity('loading');
        window.scrollTo(0, 0);
    };

    const animate = (svg, timeout, classes) => {
        let handler = null;

        handler = setTimeout(() => {
            svg.classList.add(classes);
            handler = null;
        }, timeout);
    };

    return {
        buka,
        modal,
        music,
        salin,
        escapeHtml,
        show,
        animate
    };
})();

const progress = (() => {

    const assets = document.querySelectorAll('img');
    const info = document.getElementById('progress-info');
    const bar = document.getElementById('bar');

    let total = assets.length;
    let loaded = 0;

    const progress = () => {
        loaded += 1;

        bar.style.width = Math.min((loaded / total) * 100, 100).toString() + "%";
        info.innerText = `Loading assets (${loaded}/${total}) [${parseInt(bar.style.width).toFixed(0)}%]`;

        if (loaded == total) {
            util.show();
        }
    };

    assets.forEach((asset) => {
        if (asset.complete && (asset.naturalWidth !== 0)) {
            progress();
        } else {
            asset.addEventListener('load', () => progress());
        }
    });
})();

const audio = (() => {
    let audio = null;

    const singleton = () => {
        if (!audio) {
            audio = new Audio();
            audio.src = document.getElementById('tombol-musik').getAttribute('data-url');
            audio.load();
            audio.currentTime = 0;
            audio.autoplay = true;
            audio.muted = false;
            audio.loop = true;
            audio.volume = 1;
        }

        return audio;
    };

    return {
        play: () => singleton().play(),
        pause: () => singleton().pause(),
    };
})();


const handleInput = (event) => {
    event.preventDefault();

    const formNama = document.getElementById('form-nama');
    const formPesan = document.getElementById('form-pesan');

    if(formNama.value == "" || formPesan.value == "") {
        const EmptyFiled = document.getElementById('empty');
        EmptyFiled.classList.add("show");
        setTimeout(() => {
            EmptyFiled.classList.remove("show");
        }, 3000);
    }
    else {
        const ThanksField = document.getElementById('thanks');
        ThanksField.classList.add("show");
        setTimeout(() => {
            ThanksField.classList.remove("show");
        }, 3000);
    }
    formNama.value = "";
    formPesan.value = "";

}

function submitForm(event) {
    event.preventDefault();
  
    var form = document.getElementById("messageForm");
    var formData = new FormData(form);
  
    var data = {};
    formData.forEach(function (value, key) {
      data[key] = value;
    });
  
  
    fetch("https://keshap-pooja-kp.vercel.app/url/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        fetchData();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  
  function submitForm(event) {
    event.preventDefault();
  
    var form = document.getElementById("messageForm");
    var formData = new FormData(form);
  
    var data = {};
    formData.forEach(function (value, key) {
      data[key] = value;
    });
  
  
    fetch("https://keshap-pooja-kp.vercel.app/url/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        fetchData();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  
  const fetchData = async () => {
    try {
      const response = await fetch("https://keshap-pooja-kp.vercel.app/url/getData", {
        method: "GET",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data);
      appendComments(data.user);
    } catch (error) {
      console.log(error);
    }
  };
  
  function appendComments(comments) {
    let container = document.getElementById("container");
  
    container.innerHTML = "";
  
    comments.forEach((comment) => {
      let card = document.createElement("div");
      card.classList.add(
        "card-body",
        "border",
        "rounded-4",
        "shadow",
        "p-3",
        "my-3",
        "bg-light",
        "text-dark",
        "w-100",
      );
  
      let usernameElement = document.createElement("span");
      usernameElement.classList.add(
        "fw-bold"
      )


      usernameElement.textContent = comment.username;

      let lineBreakElement = document.createElement("hr");
      lineBreakElement.classList.add(
        "text-dark",
        "my-1",
      )
  
      let messageElement = document.createElement("p");
      messageElement.textContent = comment.message;
  
      card.appendChild(usernameElement);
      card.appendChild(lineBreakElement);
      card.appendChild(messageElement);
  
      container.appendChild(card);
    });
  }