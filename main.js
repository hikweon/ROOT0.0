gsap.registerPlugin(ScrollTrigger);
const scrollWrapper = document.querySelector('.scroll_wrapper');

// 휠로 가로 스크롤 (아주 부드럽게)
scrollWrapper.addEventListener('wheel', (e) => {
  e.preventDefault();
  scrollWrapper.scrollLeft += e.deltaY * 1.0; // 감도 조절(1.0~1.2 정도)
});

function revealSectionsOnScroll() {
  const sections = document.querySelectorAll('.fade-section');
  const windowHeight = window.innerHeight;
  sections.forEach(section => {
    const sectionRect = section.getBoundingClientRect();
    // 섹션이 뷰포트에 30% 이상 들어오면 트리거 (원하면 수치 조정)
    if (sectionRect.top < windowHeight * 0.8 && sectionRect.bottom > windowHeight * 0.15) {
      // 안의 fade-in만 순차적으로 등장시키기
      const fadeEls = section.querySelectorAll('.fade-in');
      fadeEls.forEach((el, idx) => {
        setTimeout(() => el.classList.add('active'), idx * 220); // 요소마다 220ms 딜레이
      });
    } else {
      // 섹션에서 벗어나면 다시 숨기기(한번만 보여주려면 이 else문 빼면 됨)
      const fadeEls = section.querySelectorAll('.fade-in');
      fadeEls.forEach((el) => {
        el.classList.remove('active');
      });
    }
  });
}
window.addEventListener('scroll', revealSectionsOnScroll);

gsap.registerPlugin(ScrollTrigger); // 추가!

const timeline = gsap.timeline({
    scrollTrigger: {
        trigger: '#sample',
        start: '30% center', 
        end: '101% bottom',
        scrub: 1,
    }
});

timeline
.fromTo('.word01', 
    { width: '0%', opacity: 0 }, 
    { width: 'auto', opacity: 1, duration: 1.2, ease: 'power2.out' }
)
.fromTo('.word02', 
    { width: '0%', opacity: 0 }, 
    { width: 'auto', opacity: 1, duration: 1.2, ease: 'power2.out' }
);

gsap.registerPlugin(ScrollTrigger);

gsap.to('.gsap-video-zoom', {
  width: 1400,
  height: 800,
  borderRadius: 10,
  duration: 1,
  scrollTrigger: {
    trigger: '.gsap-video-zoom-section',
    start: 'top center',   // (예) 섹션 top이 화면 중간에 닿으면 애니 시작
    end: 'top 30%',        // 섹션 top이 화면 30%까지 오면 애니 끝
    scrub: 1,
    // onLeave: ... (자동 스크롤 이동은 필요시만)
  }
});
// 가로 스크롤이 적용될 두 번째 섹션(.xScroll) 지정
const xScroll = document.querySelector(".xScroll");

// 콘텐츠 전체 길이(scrollWidth)에서 현재 뷰포트의 너비(window.innerWidth)를 뺀 값을 통해 가로 스크롤 시 이동해야 할 전체 길이 계산
const xScrollWidth = xScroll.scrollWidth - window.innerWidth;
gsap.to(xScroll, {
  x: -xScrollWidth, // 콘텐츠가 가로로 이동(스크롤)되게끔 음수로 설정
  ease: "none", // 애니메이션에 가속도 효과를 사용하지 않음
  scrollTrigger: {
    trigger: xScroll, // 트리거 요소 지정
    start: "top top", // xScroll의 상단과 브라우저 상단이 맞닿을 때 애니메이션 시작
    end: `+=${xScrollWidth}`, // xScroll의 콘텐츠 너비만큼 스크롤 후 애니메이션 종료
    scrub: true, // 스크롤 진행에 따라 애니메이션이 동기화되어 진행
    pin: true, // 스크롤 중에 요소를 고정하여 애니메이션을 실행
    anticipatePin: 1, // 스크롤 트리거 요소의 위치를 예측하여 스크롤 시 튀는 효과 방지
    markers: false, // 디버그용 마커 표시
  }
});