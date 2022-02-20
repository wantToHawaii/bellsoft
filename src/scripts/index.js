import Swiper, {
  Pagination,
  Navigation,
  EffectFade,
  Scrollbar,
  Mousewheel,
} from "swiper";
import "swiper/swiper.scss";
import "swiper/components/effect-fade/effect-fade.scss";
import "swiper/components/pagination/pagination.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/scrollbar/scrollbar.scss";

import { fileDropZone, choicesSelect } from "./form-controls";

import "./page-native-image";
import "./page-career";
import "./page-partners-ru";
import "./page-libericajdk-vs-openjdk";
import "./page-almaca-linux";

Swiper.use([Pagination, Navigation, EffectFade, Scrollbar, Mousewheel]);

window.addEventListener("load", () => {
  const initHeaderMenu = () => {
    const header = document.querySelector("#site-header");

    if (!header) return;

    const menu = header.querySelector("#header-menu");
    const iconMenuButton = header.querySelector("#icon-menu-button");

    iconMenuButton.addEventListener("click", () => {
      menu.classList.toggle("active");
    });
  };

  const initFooterMenu = () => {
    const footer = document.querySelector("#site-footer");

    if (!footer) return;

    const toggleMenuButtons = footer
      ? footer.querySelectorAll(".button-toggle-menu")
      : null;

    for (let button of toggleMenuButtons) {
      button.addEventListener("click", function () {
        this.classList.toggle("active");
      });
    }
  };

  const initCardsWithDropDownText = () => {
    const cardsWithDropDownText = document.querySelectorAll(
      ".has-drop-down-text"
    );
    const toggleCardDropDownText = function (e) {
      const card = this;
      const isButton = e.target.classList.contains("toggle-drop-down-text");
      if (isButton) {
        card.classList.toggle("drop-down-text-visible");
      }
    };
    if (cardsWithDropDownText && cardsWithDropDownText.length) {
      for (let card of cardsWithDropDownText) {
        card.addEventListener("click", toggleCardDropDownText);
      }
    }
  };

  const onContactFormSubmit = (selector) => {
    const form = document.querySelector(selector);
    const modal = form ? form.querySelector(".bs-callback-modal") : null;

    if (!form || !modal) return;

    const closeButtons = modal.querySelectorAll("[data-close]");

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      form.classList.add("submitted");
    });

    for (let btn of closeButtons) {
      btn.addEventListener("click", () => {
        form.classList.remove("submitted");
      });
    }
  };

  initHeaderMenu();
  initFooterMenu();
  initCardsWithDropDownText();
  choicesSelect();
  fileDropZone();
  onContactFormSubmit("#contact-form");
});
