gsap.registerPlugin(ScrollTrigger);
const myText = new SplitType('#my-text');

function valueSettters () {
    gsap.set('#nav a', { y: '-100%', opacity: 0});
    gsap.set('#home .parent .child', { y: '100%'});
    gsap.set('footer .parent .child', { y: '100%'});
    gsap.set('#playMusic', { opacity: 0});
    gsap.set('#center-bottom', { opacity: 0});
    gsap.set('.c-title__row .arrow-svg', { opacity: 0});
}

//create the span
function revealToSpan() {
    document.querySelectorAll(".reveal").forEach(function(el) {
        //create tow spans
        var parent = document.createElement('span');
        var child = document.createElement('span');
    
        //parent and child both sets their respective classes
        parent.classList.add('parent');
        child.classList.add('child');
    
        //span parent gets child and child gets elem details
        child.innerHTML = el.innerHTML;
        parent.appendChild(child);
    
        //elem replaces its value with parent span
        el.innerHTML = '';
        el.appendChild(parent);
    });
}


function hiddenSvg() {
    gsap.to("#section0 .c-title__svg", {
        opacity: 0,
       
    })
}

hiddenSvg();

function loaderAnimation () {
    //show name
        new Vivus(
            'my-svg',{ type: 'delayed',duration: 120,animTimingFunction: Vivus.EASE_IN}, function(obj) { 
                obj.el.classList.add('finished');
            }
        );
    
        //loader 
        var tl = gsap.timeline();
        tl
            .from("#my-svg", { delay: 2, duration: 1, stagger: 0.2, ease: Power3.easeInOut })
            .from("#loader h5", { opacity: 0, duration: 1, ease: Circ.easeInOut })
            .from("#loader .child span", { opacity: 0,delay: -1, x: 100, duration: 1, stagger: 0.1, ease: Circ.easeInOut })
            .to('#center-bottom', {opacity:1, duration:1})
    
        
}



function animateSvg() {
    document.querySelectorAll('#visual > path').forEach(function (e) {
        const pathLength = e.getTotalLength();
        gsap.set(e, { strokeDasharray: pathLength, });
        gsap.from(e, {
            opacity:0,
            strokeDashoffset: pathLength,
            duration: 3,
            delay: -1,
            ease: Expo.easeInOut,
            onComplete: function () {
                e.style.fill = "#EE5745"; // Thay đổi màu fill khi hoàn tất
            }
        });
    });
}

function getLocalTime () {
    const now = new Date();
    const japanTime = now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit', 
        hour12: false, 
        timeZone: 'Asia/Tokyo' 
    })
    
    const localTime = document.getElementById('local-time');
    localTime.innerHTML = japanTime
}


function showSvg () {
    gsap.to("#section0 .c-title__svg", {
        delay: -1.5,
        opacity: 1,
    })
}


function animateHomePage() {
    var tl = gsap.timeline();

    if (window.innerWidth > 854) { // Chỉ áp dụng nếu KHÔNG phải điện thoại
        tl
        .to("#home #nav", {
          backgroundColor: "rgba(13, 13, 13, 0.6)",
          duration: 0.5,
          delay: -0.5,
          ease: "ease",
        });
      }

    tl
        .to('#nav a', {
            y: 0,
            opacity: 1,
            stagger:0.1,
            duration:2,
            delay: -1,
            ease: Expo.easeInOut,
        }) 
        .to(".char", {
            y: 0,
            stagger: 0.05,
            delay: -0.6,
            duration: 0.1,
        })

        .to(".child", {
            y: 0,
            stagger: 0.05,
            delay: -0.6,
            duration: 0.4,
        })

        .to(".c-title__row .arrow-svg", {
            opacity: 1,
            stagger: 0.05,
            delay: -0.2,
            duration: 0.4,
        })
    
        .to('#playMusic', {
            opacity: 1,
            duration: 1,
            delay: -0.7,
            ease: Expo.easeInOut,
            onComplete: function(){
                showSvg ()
                animateSvg();
            }
        })
}


if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

// Cuộn về đầu trang khi tải xong (mượt hơn)
window.addEventListener('load', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
        document.body.style.overflow = 'auto'; // Bật thanh cuộn
    }, 500);
});


function cardHoverEffect() {
    const cursor = document.getElementById('cursor');
    let mouseX = 0, mouseY = 0; 
    let cursorX = 0, cursorY = 0;
    const lerpFactor = 0.1; // Độ trễ (0.1 = di chuyển chậm, 0.2 = nhanh hơn)

    document.querySelectorAll('.cnt').forEach(cnt => {
        let showingImage = null;

        cnt.addEventListener("mousemove", function (e) {
            if (!e.target.dataset.index) return;

            showingImage = e.target;
            const imageIndex = e.target.dataset.index;
            if (cursor.children[imageIndex]) {
                cursor.children[imageIndex].style.opacity = 1;
            }

            // Lưu vị trí chuột thay vì cập nhật trực tiếp
            mouseX = e.clientX - 20;
            mouseY = e.clientY;

            showingImage.style.filter = "grayscale(1)";
            document.querySelector('#work').style.backgroundColor = `#${e.target.dataset.color}`;
        });

        cnt.addEventListener("mouseleave", function () {
            if (!showingImage || !showingImage.dataset.index) return;

            const imageIndex = showingImage.dataset.index;
            if (cursor.children[imageIndex]) {
                cursor.children[imageIndex].style.opacity = 0;
            }

            showingImage.style.filter = "grayscale(0)";
            document.querySelector('#work').style.backgroundColor = "#B7AB98";

            showingImage = null;
        });
    });

    // Hàm cập nhật vị trí cursor với hiệu ứng mượt
    function animateCursor() {
        cursorX += (mouseX - cursorX) * lerpFactor;
        cursorY += (mouseY - cursorY) * lerpFactor;

        cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;

        requestAnimationFrame(animateCursor);
    }

    animateCursor(); // Gọi hàm để bắt đầu hiệu ứng
}

document.addEventListener("DOMContentLoaded", cardHoverEffect);



revealToSpan();
valueSettters()
loaderAnimation();
getLocalTime();
cardHoverEffect()




const overlay = document.querySelector('.overlay-left');


const container = document.querySelector('#imgleft');

let initialX = 50; // Vị trí X ban đầu (mặc định là 50%)
let initialY = 50; // Vị trí Y ban đầu (mặc định là 50%)
container.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    const x = Math.round((clientX / window.innerWidth) * 100) + 20;
    const y = Math.round((clientY / window.innerHeight) * 100) ;

    // Cập nhật vị trí ban đầu mỗi lần hover
    initialX = x;
    initialY = y;

    // Áp dụng vị trí ban đầu cho hình tròn
    gsap.set(overlay, {
        '--x': `${initialX}%`,
        '--y': `${initialY}%`,
        clipPath: `circle(0 at ${initialX}% ${initialY}%)`,
    });

    // Cập nhật vị trí của hình tròn
    gsap.to(overlay, {
        '--x': `${x}%`,
        '--y': `${y}%`,
        duration: 0.1,
        ease: 'power1.out',
        opacity: 1,
    });

    // Phóng to hình tròn

    if (window.innerWidth > 1280) {
        gsap.to(overlay, {
            clipPath: `circle(150px at ${x}% ${y}%)`,
            duration: 0.3,
            ease: 'power1.out',
            opacity: 1,
    
        });
    }

    gsap.to(overlay, {
        clipPath: `circle(100px at ${x}% ${y}%)`,
        duration: 0.3,
        ease: 'power1.out',
        opacity: 1,

    });
    
});

// Khi chuột rời khỏi container, thu nhỏ hình tròn và trở về vị trí ban đầu
container.addEventListener('mouseleave', () => {
    gsap.to(overlay, {
        clipPath: `circle(10px at ${initialX}% ${initialY}%)`,
        duration: 0.6,
        ease: 'power1.out',
        opacity: 0,
    });
});


// Play music
const audio = document.getElementById("bgMusic");
function musicplay () {
    const btn = document.getElementById("playMusic");
    
        // Xử lý sự kiện click trên nút bấm
        btn.addEventListener("click", function() {
            if (audio.paused) {
                audio.play();
                gsap.to('.pause-play-btn .pause', {
                    y: "-200%",
                    duration: 0.4,
                    ease: Power3.easeInOut
                })
                gsap.to('.pause-play-btn .play', {
                    y: "0",
                    duration: 0.4,
                    ease: Power3.easeInOut,
                    onComplete: function () {
                        gsap.to('.pause-play-btn .pause', {
                            y: "100%",
                            duration: 0})
                    }
                })
               
            } else {
                audio.pause();
                gsap.to('.pause-play-btn .play', {
                    y: "-100%",
                    duration: 0.4,
                    ease: Power3.easeInOut
                })

                gsap.to('.pause-play-btn .pause', {
                    y: "-100%",
                    duration: 0.4,
                    ease: Power3.easeInOut,
                    onComplete: function () {
                        gsap.to('.pause-play-btn .play', {
                            y: "100%",
                            duration: 0})
                    }
                })
               
            }
        });
}

musicplay()

// About text effects
function aboutTextEffect () {
    
    // Định nghĩa hàm animateTextElements nhận hai tham số: selector (chọn phần tử) và splitBy (cách chia nội dung)
const animateTextElements = (selector, splitBy) => {
    // Lấy tất cả các phần tử DOM phù hợp với selector
    const textContainers = document.querySelectorAll(selector);

    // Duyệt qua từng phần tử được chọn
    textContainers.forEach((container) => {
        let elements = []; // Mảng để lưu các phần tử (từ hoặc chữ cái)
        let elementType = ""; // Loại phần tử ("word" hoặc "letter")

        // Nếu splitBy là "words", chia nội dung thành các từ
        if (splitBy === "words") {
            elements = container.textContent.trim().split(/\s+/); // Tách nội dung thành các từ
            elementType = "word"; // Đặt loại phần tử là "word"
        }
        // Nếu splitBy là "letters", chia nội dung thành các chữ cái
        else if (splitBy === "letters") {
            const words = container.textContent.trim().split(/\s+/); // Tách nội dung thành các từ
            elements = []; // Khởi tạo mảng elements

            // Duyệt qua từng từ
            words.forEach((word, wordIndex) => {
                // Duyệt qua từng chữ cái trong từ
                for (let i = 0; i < word.length; i++) {
                    elements.push(word[i]); // Thêm chữ cái vào mảng elements
                }

                // Nếu không phải từ cuối cùng, thêm một khoảng trắng vào mảng
                if (wordIndex < words.length - 1) {
                    elements.push(" ");
                }
            });
            elementType = "letter"; // Đặt loại phần tử là "letter"
        }

        // Xóa nội dung hiện tại của container
        container.textContent = "";

        const animatedElements = []; // Mảng để lưu các phần tử được tạo ra và thông tin animation

        // Duyệt qua từng phần tử trong mảng elements
        elements.forEach((element, index) => {
            // Nếu splitBy là "letters" và phần tử là khoảng trắng, thêm khoảng trắng vào container
            if (splitBy === "letters" && element === " ") {
                container.appendChild(document.createTextNode(" "));
                return; // Bỏ qua phần tử này
            }

            // Tạo một thẻ span để chứa phần tử (từ hoặc chữ cái)
            const elementSpan = document.createElement("span");
            elementSpan.textContent = element; // Đặt nội dung của span
            elementSpan.classList.add(elementType); // Thêm class tương ứng (word hoặc letter)
            container.appendChild(elementSpan); // Thêm span vào container

            // Nếu splitBy là "words" và không phải phần tử cuối cùng, thêm khoảng trắng vào container
            if (splitBy === "words" && index < elements.length - 1) {
                container.appendChild(document.createTextNode(" "));
            }

            // Thêm thông tin phần tử vào mảng animatedElements để sử dụng cho animation
            animatedElements.push({
                element: elementSpan, // Phần tử span
                originalX: 0, // Vị trí gốc X
                originalY: 0, // Vị trí gốc Y
                currentX: 0, // Vị trí hiện tại X
                currentY: 0, // Vị trí hiện tại Y
                targetX: 0, // Vị trí đích X
                targetY: 0, // Vị trí đích Y
            });
        });

        // Sử dụng setTimeout để đợi 100ms trước khi lấy vị trí gốc của các phần tử
        setTimeout(() => {
            animatedElements.forEach((element) => {
                // Lấy vị trí và kích thước của phần tử
                const rect = element.element.getBoundingClientRect();
                // Tính toán vị trí gốc X và Y (trung tâm của phần tử)
                element.originalX = rect.left + rect.width / 2;
                element.originalY = rect.top + rect.height / 2;
            });
        }, 100);

        // Thêm sự kiện mousemove để theo dõi vị trí chuột
        document.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX -20; // Lấy vị trí X của chuột
            const mouseY = e.clientY; // Lấy vị trí Y của chuột

            const radius = 150; // Bán kính ảnh hưởng của chuột
            const maxDisplacement = 100; // Độ dịch chuyển tối đa

            // Duyệt qua từng phần tử trong animatedElements
            animatedElements.forEach((element) => {
                const originalX = element.originalX; // Vị trí gốc X
                const originalY = element.originalY; // Vị trí gốc Y

                // Tính khoảng cách giữa chuột và phần tử
                const dx = originalX - mouseX;
                const dy = originalY - mouseY;
                const distance = Math.sqrt(dx * dx + dy * dy);

                // Nếu khoảng cách nhỏ hơn bán kính, tính toán độ dịch chuyển
                if (distance < radius) {
                    const force = (1 - distance / radius) * maxDisplacement; // Lực dịch chuyển
                    element.targetX = (dx / distance) * force; // Đích X
                    element.targetY = (dy / distance) * force; // Đích Y
                } else {
                    // Nếu khoảng cách lớn hơn bán kính, đặt đích về 0
                    element.targetX = 0;
                    element.targetY = 0;
                }
            });
        });

        // Hàm animate để cập nhật vị trí của các phần tử
        const animate = () => {
            const lerpFactor = 0.1; // Hệ số làm mượt animation
            animatedElements.forEach((element) => {
                // Cập nhật vị trí hiện tại dựa trên đích và hệ số lerpFactor
                element.currentX += (element.targetX - element.currentX) * lerpFactor;
                element.currentY += (element.targetY - element.currentY) * lerpFactor;
                // Áp dụng transform để dịch chuyển phần tử
                element.element.style.transform = `translate(${element.currentX}px, ${element.currentY}px)`;
            });
            // Gọi lại hàm animate trong lần render tiếp theo
            requestAnimationFrame(animate);
        };

        // Bắt đầu animation
        animate();
    });
};
    console.log('ok')
// Gọi hàm animateTextElements để áp dụng hiệu ứng cho các phần tử có class ".anime-text" (chia theo từ)
animateTextElements(".anime-text", "words");
// Gọi hàm animateTextElements để áp dụng hiệu ứng cho các phần tử có class ".anime-header" (chia theo chữ cái)
animateTextElements(".anime-header", "letters");
}



document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault(); // Ngăn chặn hành vi mặc định của thẻ <a>

            const targetId = this.getAttribute("href"); // Lấy ID từ href
            const targetElement = document.querySelector(targetId); // Tìm phần tử theo ID
            if( targetId === "#about") {
                setTimeout(() => {
                    aboutTextEffect()
                },1000)
            }
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        });
    });
});

// Load website after click start and play music
const startBtn = document.getElementById('center-bottom'); 

setTimeout(() => {
    startBtn.style.pointerEvents = 'all';
}, 4000);

startBtn.addEventListener('click', function() {
    audio.play();
    var tl = gsap.timeline();
        tl
            .to("#center-bottom", { opacity: 0, duration: 0.5, ease: Circ.easeInOut })
            .to("#loader .parent .child", { y: "-200%", duration: 1, ease: Circ.easeInOut })
            .to("#loader", { height: "0", duration: 0.5, ease: Circ.easeInOut })
            .to("#loader2", { height: "100%", delay: -1, top: 0, duration: 0.5, ease: Circ.easeInOut })
            .to("#loader2", { height: "0%",delay: -0.3, top: 0, duration: 1, ease: Circ.easeInOut, onComplete: function(){
                animateHomePage();
            } })


        const navEl = document.querySelectorAll("#nav .nav-item");
    
        navEl.forEach(function(el) {
            gsap.killTweensOf(el.querySelector("#nav .parent"));
            el.addEventListener('mouseenter', function() {
                gsap.to(el.querySelector("#nav .parent"), {
                    y: "-100%",
                    duration: 0.4,
                    ease: Power3.easeInOut
                });
            });
            
            el.addEventListener('mouseleave', function() {
                gsap.killTweensOf(el.querySelector("#nav .parent"));
                gsap.to(el.querySelector("#nav .parent"), {
                    y: 0,
                    duration: 0,
                    ease: Power3.easeInOut
                });
            });
    
        });

        enableScroll()

        const lenis = new Lenis({
            duration: 1.2,
            smoothWheel: true
        })
        
        function raf(time) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }
        requestAnimationFrame(raf)
});

// IMG hover effect
function imageHoverEffect() {
    
const blocks = document.querySelectorAll('.block');
const resetDuration = 300;

blocks.forEach((block) =>{
    let timeoutId;
    block.addEventListener('mousemove', () => {
        clearTimeout(timeoutId);
        block.classList.add('active');
        timeoutId = setTimeout(() => {
            block.classList.remove('active');
        },resetDuration)
    })
})
}

// Liink List Effect 
const LinkEl = document.querySelectorAll(".link-item a");
        LinkEl.forEach(function(el) {
            gsap.killTweensOf(el.querySelector(".link-item .parent"));
            el.addEventListener('mouseenter', function() {
                gsap.to(el.querySelector(".link-item .parent"), {
                    y: "-100%",
                    duration: 0.4,
                    ease: Power3.easeInOut
                });
            });
            
            el.addEventListener('mouseleave', function() {
                gsap.killTweensOf(el.querySelector(".link-item .parent"));
                gsap.to(el.querySelector(".link-item .parent"), {
                    y: 0,
                    duration: 0,
                    ease: Power3.easeInOut
                });
            });
    
        });

// can't scroll website until click start button
function enableScroll() {
    document.documentElement.style.overflow = "auto"; // Bật lại cuộn
    document.documentElement.style.height = "auto";
}

// Check email
function checkEmail() {
    const validationText = document.querySelector('.validation-email');
    const emailInput = document.getElementsByName("email")[0]; // Lấy phần tử đầu tiên
    
    emailInput.addEventListener('focus', ()=> {
        validationText.style.display = 'none';
    })
    
    emailInput.addEventListener('blur', () => {
        const email = emailInput.value.trim(); // Lấy giá trị và xóa khoảng trắng

        const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        const isValid = gmailRegex.test(email);
        validationText.style.display = 'none';
        if (!isValid) {
            validationText.style.display = 'block';
        } else {
            validationText.style.display = 'none';
        }
    });

    
}


const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        } else {
            entry.target.classList.remove('show');
        }
    });
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));

const skillElements = document.querySelectorAll('#skill');
skillElements.forEach((el) => observer.observe(el));


const observer2 = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            aboutTextEffect()
        } 
    });
}, { threshold: 1.0 }); 
// Chọn phần tử div cần theo dõi
const abouElement = document.querySelector("#about"); 
if (abouElement) {
    observer2.observe(abouElement);
}


// Move
const move = function () {
    window.addEventListener("wheel", function(dets){
        //dets.deltaY > 0 quận xuống và ngược lại
        if(dets.deltaY >0) {
            gsap.to(".marque", {
                transform: "translateX(-200%)",         
                duration: 4,        
                repeat: -1,          
                ease: "none"       
            });
            gsap.to(".marque img", {
                rotate:180
            })
            
        }else {
            gsap.to(".marque", {
                transform: "translateX(0%)",         
                duration: 4,        
                repeat: -1,          
                ease: "none"       
            });
            gsap.to(".marque img", {
                rotate:0
            }) 
        }
        
    })
}



imageHoverEffect()
move()
checkEmail();


const skills = [
    { name: "html", percent: "60%" },
    { name: "ex", percent: "60%" },
    { name: "ai", percent: "60%" },
    { name: "pts", percent: "55%" },
    { name: "c", percent: "30%" },
    { name: "python", percent: "30%" }
  ];
  
  skills.forEach((skill) => {
    gsap.fromTo(
      `.${skill.name}`, // selector
      { width: "0%" },  // trạng thái ban đầu
      {
        width: skill.percent,
        duration: 2,
        scrollTrigger: {
          trigger: "#skill", // phần tử để bắt đầu
          start: "top bottom", // khi phần tử #skill chạm 80% viewport
          toggleActions: "play none none none"
        }
      }
    );
  });
