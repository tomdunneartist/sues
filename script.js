let isTouchDevice = !1;
(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) && (isTouchDevice = !0), gsap.registerPlugin(ScrollTrigger);
const scrollContainer = document.querySelector(".main");
let mobileScrollpos, isMobile = !1,
    introShown = !1,
    isCloned = !1,
    hasMobileInit = !1,
    hasDesktopInit = !1,
    page = document.querySelector(".main"),
    folioItems = document.querySelector(".folio__inner"),
    items = document.querySelectorAll(".folio__item"),
    clones = [],
    disableScroll = !1,
    scrollwidth = 0,
    scrollpos = 0,
    clonesWidthHeight = 0;
const mediaQuery = window.matchMedia("(max-width: 960px)");

function mediaQueryCheck(e) {
    e.matches ? (scrollContainer.removeEventListener("wheel", sideScroll, !0), isMobile = !0) : (scrollContainer.addEventListener("wheel", sideScroll, !0), isMobile = !1), setupReset()
}

function hideIntro() {
    $(".intro").addClass("js-intro-hide"), setTimeout((function () {
        $(".intro").hide()
    }), 500)
}

function sideScroll(e) {
    e.preventDefault(), scrollContainer.scrollLeft += e.deltaY, scrollContainer.scrollLeft += e.deltaX
}

function getScrollPos() {
    return page.scrollLeft
}

function setScrollPos(e) {
    page.scrollLeft = e
}

function getClonesWidthHeight() {
    return clonesWidthHeight = 0, clones.forEach((e => {
        clonesWidthHeight += e.offsetWidth + 20
    })), clonesWidthHeight
}

function reCalc() {
    scrollpos = getScrollPos(), scrollWidth = page.scrollWidth, clonesWidthHeight = getClonesWidthHeight(), scrollpos <= 0 && !isMobile && setScrollPos(1)
}

function scrollUpdate() {
    disableScroll || (scrollpos = getScrollPos(), clonesWidthHeight + scrollpos >= scrollWidth - 40 ? (setScrollPos(1), disableScroll = !0) : scrollpos <= 0 && (setScrollPos(scrollWidth - 40 - clonesWidthHeight), disableScroll = !0)), disableScroll && window.setTimeout((() => {
        disableScroll = !1
    }), 40)
}

function cloneItems() {
    items.forEach((e => {
        const o = e.cloneNode(!0);
        folioItems.appendChild(o), o.classList.add("js-clone")
    })), clones = folioItems.querySelectorAll(".js-clone")
}

function desktopScrollInit() {
    cloneItems(), reCalc(), page.addEventListener("scroll", (() => {
        window.requestAnimationFrame(scrollUpdate)
    }), !1), window.addEventListener("touchmove", (() => {
        window.requestAnimationFrame(scrollUpdate)
    }), !1), window.addEventListener("resize", (() => {
        window.requestAnimationFrame(reCalc)
    }), !1)
}

function mobileScrollInit() {
    $(".folio__inner").clone().appendTo("#js-folio-cloned"), $("#js-folio-cloned .folio__inner").addClass("js-mobile-clone"), $("#js-folio-cloned .about").remove(), ScrollTrigger.create({
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        onUpdate: e => {
            .8 <= e.progress.toFixed(2) && 1 === e.direction && ($("#js-folio-cloned > div").clone().appendTo(".folio"), ScrollTrigger.refresh())
        }
    })
}

function setupReset() {
    isMobile && hasDesktopInit && !hasMobileInit ? ($(".folio__item.js-clone").remove(), page.removeEventListener("scroll", (() => {
        window.requestAnimationFrame(scrollUpdate)
    }), !1), window.removeEventListener("touchmove", (() => {
        window.requestAnimationFrame(scrollUpdate)
    }), !1), window.removeEventListener("resize", (() => {
        window.requestAnimationFrame(reCalc)
    }), !1), mobileScrollInit(), hasDesktopInit = !1, hasMobileInit = !0) : isMobile && !hasMobileInit && (mobileScrollInit(), hasMobileInit = !0), isMobile || hasDesktopInit || !hasMobileInit ? isMobile || hasDesktopInit || (desktopScrollInit(), hasDesktopInit = !0) : ($(".js-mobile-clone").remove(), desktopScrollInit(), hasDesktopInit = !0, hasMobileInit = !1)
}
mediaQuery.addListener(mediaQueryCheck), mediaQueryCheck(mediaQuery), $(document).ready((function () {
    isTouchDevice && $("body").addClass("touch-device"), setTimeout(hideIntro, 5e3), $(document).one("click", (function () {
        hideIntro()
    })), $(".js-toggle-about").click((function () {
        $(".about").addClass("js-about-visible"), $("body").addClass("js-noscroll")
    })), $(".js-toggle-overview").click((function () {
        $("body").removeClass("js-noscroll"), $(".about").removeClass("js-about-visible")
    })), $(document).on("click", ".folio__item", (function () {
        isMobile && ($(".folio__item").not(this).removeClass("js-show-caption"), $(this).toggleClass("js-show-caption"))
    }))
})), window.onload = reCalc(), Promise.all(Array.from(document.images).filter((e => !e.complete)).map((e => new Promise((o => {
    e.onload = e.onerror = o
}))))).then((() => {
    reCalc()
}));