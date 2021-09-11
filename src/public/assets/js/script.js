//const Swal = require('sweetalert2');

//const { default: Swal } = require("sweetalert2");

// Alertas
(() => {
  const alertsInputs = document.querySelectorAll("[data-swal-title]");

  if (alertsInputs.length > 0) {
    alertsInputs.forEach((input) => {
      input.addEventListener("click", (e) => {
        e.preventDefault();
        Swal.fire({
          icon: "warning",
          title: input.dataset.swalTitle,
          text: "Te invitamos a mejorar tu membresía",
          button: false,
        });
      });
    });
  }
})();

// select plan
(() => {
  const selectPlan = document.getElementById("select-plan");
  if (selectPlan) {
    const options = selectPlan.querySelectorAll(".select-plan__option");
    const vipPress = document.getElementById("vip-press");
    const goldPress = document.getElementById("gold-press");
    const vipTime = document.getElementById("vip-time");
    const goldTime = document.getElementById("gold-time");

    const vipmensualCost = document.getElementById("mensual_vip");
    const goldmensualCost = document.getElementById("mensual_gold");
    const vipanualCost = document.getElementById("anual_vip");
    const goldanualCost = document.getElementById("anual_gold");

    const monto_plan = document.getElementById("monto_plan");
    const tipo_plan = document.getElementById("tipo_plan");
    const modo_plan = document.getElementById("modo_plan");

    var detalle_vip = document.getElementById("vip-detalle");
    var detalle_gold = document.getElementById("gold-detalle");

    selectPlan.addEventListener("click", changePlan);

    function changePlan(e) {
      if (e.target.classList.contains("select-plan__option")) {
        options.forEach((option) => {
          if (option.classList.contains("active")) {
            option.classList.remove("active");
          }
        });
        e.target.classList.add("active");
        if (vipPress && goldPress) {
          if (e.target.dataset.plan === "anual") {
            vipPress.textContent = vipanualCost.innerHTML;
            goldPress.textContent = goldanualCost.innerHTML;
            if (tipo_plan.value === "Gold") {
              monto_plan.value = goldanualCost.innerHTML;
              modo_plan.value = "Anual";
            }
            if (tipo_plan.value === "VIP") {
              monto_plan.value = vipanualCost.innerHTML;
              modo_plan.value = "Anual";
            }

            if (document.body.classList.contains("dashboard-body")) {
              goldTime.innerHTML =
                '/ Año <span style="font-size: .7em;">'+detalle_gold.innerHTML+'</span>';
              vipTime.innerHTML =
                '/ Año <span style="font-size: .7em;">'+detalle_vip.innerHTML+'</span>';
            } else {
              goldTime.textContent = "/ Año "+detalle_gold.innerHTML;
              vipTime.textContent = "/ Año " +detalle_vip.innerHTML;
            }
          } else {
            vipPress.textContent = vipmensualCost.innerHTML;
            goldPress.textContent = goldmensualCost.innerHTML;
            if (tipo_plan.value === "Gold") {
              monto_plan.value = goldmensualCost.innerHTML;
              modo_plan.value = "Mensual";
            }
            if (tipo_plan.value === "VIP") {
              monto_plan.value = vipmensualCost.innerHTML;
              modo_plan.value = "Mensual";
            }
            if (document.body.classList.contains("dashboard-body")) {
              goldTime.innerHTML = "/ Mes "+detalle_gold.innerHTML;
              vipTime.innerHTML = "/ Mes "+detalle_vip.innerHTML;
            } else {
              goldTime.textContent = "/ Mes " +detalle_gold.innerHTML;
              vipTime.textContent = "/ Mes " +detalle_vip.innerHTML;
            }
          }
        }
      }
    }
  }
})();

// Steps
(() => {
  const steps = document.querySelector(".steps");

  if (steps) {
    const stepsItems = steps.querySelectorAll(".step");

    // Añadir left al cargar la página
    setLeftToSteps();

    // Recalcular left si el usuario hace resize a la ventana
    window.addEventListener("resize", setLeftToSteps);

    function setLeftToSteps() {
      if (matchMedia("screen and (min-width: 992px)").matches) {
        stepsItems.forEach((item) => {
          const left = item.querySelector(".step__number").offsetLeft;
          item.querySelector(".step__body").style.left = `${left}px`;
        });
      } else {
        stepsItems.forEach((item) => {
          item.querySelector(".step__body").style.left = 0;
        });
      }
    }
  }
})();

// Toggle header
(() => {
  const notifications = document.getElementById("notifications");
  const accountOptions = document.getElementById("account-options");
  const listNotifications = document.getElementById("list-notifications");
  const listAccountOptions = document.getElementById("list-account-options");
  const headerToggleElements = document.getElementById(
    "header-toggle-elements"
  );

  if (headerToggleElements) {
    document.addEventListener("click", (e) => {
      if (
        e.target !== headerToggleElements &&
        e.target !== listNotifications &&
        e.target !== listAccountOptions &&
        e.target !== notifications &&
        e.target !== notifications.querySelector("i") &&
        e.target !== accountOptions &&
        e.target !== accountOptions.querySelector("i") &&
        !e.target.classList.contains("list-notifications__item") &&
        !e.target.classList.contains("list-account-options__title") &&
        !e.target.classList.contains("op") // Solución rapida hahaha :D
      ) {
        headerToggleElements.classList.remove("show");
      }
    });

    notifications.addEventListener("click", activeHeaderElements);
    accountOptions.addEventListener("click", activeHeaderElements);

    headerToggleElements.addEventListener("transitionend", (e) => {
      if (!headerToggleElements.classList.contains("show")) {
        listAccountOptions.classList.remove("active");
        listNotifications.classList.remove("active");
      }
    });

    function activeHeaderElements(e) {
      e.preventDefault();

      let target = e.target;

      headerToggleElements.classList.add("show");

      if (target.classList.contains("account-options")) {
        // Aliminar la el otro si esta activo
        if (listNotifications.classList.contains("active")) {
          listNotifications.classList.remove("active");
        }

        if (listAccountOptions.classList.contains("active")) {
          headerToggleElements.classList.remove("show");
        } else {
          listAccountOptions.classList.add("active");
        }
      } else {
        // Aliminar la el otro si esta activo
        if (listAccountOptions.classList.contains("active")) {
          listAccountOptions.classList.remove("active");
        }

        if (listNotifications.classList.contains("active")) {
          headerToggleElements.classList.remove("show");
        } else {
          listNotifications.classList.add("active");
        }
      }
    }
  }
})();

// Modificar nav de Bootstrap
(() => {
  const mainNavbar = document.querySelector(".main-navbar");
  const navbarCollapse = document.querySelector(".navbar-collapse");
  const toggle = document.querySelector(".navbar-toggler");

  if (toggle && navbarCollapse && mainNavbar) {
    // Eliminar elemento activo despues de la transicion
    toggle.addEventListener("click", () => {
      if (!navbarCollapse.classList.contains("show")) {
        mainNavbar.classList.add("nav-show");
      } else {
        mainNavbar.classList.remove("nav-show");
      }
    });

    /* Al hacer Scroll */
    window.addEventListener("scroll", (e) => {
      if (window.scrollY > 200) {
        mainNavbar.style.padding = ".5rem 1rem";
      } else {
        mainNavbar.style.padding = "";
      }
    });
  }
})();

/* Eliminar form message */
(() => {
  const formMessageContainer = document.querySelector(
    ".form-message-container"
  );
  const formMessageError = document.querySelector(".form-message-error");

  if (formMessageContainer) {
    setTimeout(() => {
      formMessageContainer.remove();
    }, 5000);
  } else if (formMessageError) {
    setTimeout(() => {
      formMessageError.remove();
    }, 5000);
  }
})();

/* Section Steps */
(() => {
  // Variables - Esta variable es para la condicion de abajo
  const formSteps = document.querySelector(".form-steps");

  if (formSteps) {
    // Variables
    const formStepsContainer = document.querySelectorAll(
      ".form-control-steps__container"
    );
    const stepsNav = document.querySelector(".steps-nav");
    const stepNavItems = stepsNav.querySelectorAll(".steps-nav__items");
    const beforePage = document.querySelector(".before-page");
    const stepNavDesc = stepsNav.querySelector(".steps-nav__desc");
    const createGateBtn = document.getElementById("create-gate-btn");

    // Llamadas a funciones y eventos de usuarios
    prepare();
    setPaddingToInputs();
    configNavDesc();
    formSteps.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    formSteps.addEventListener("click", changeStep);
    beforePage.addEventListener("click", beforeStep);
    createGateBtn.addEventListener("click", () => {
      formSteps.submit();
    });

    function prepare() {
      const navNumbers = document.querySelectorAll(".steps-nav__number");
      const sections = formSteps.querySelectorAll(".section-step");

      if (sections.length > 0) {
        sections.forEach((section, i) => {
          ++i;
          section.setAttribute("data-step-page", i);
          section.querySelector(".form-steps__btn").dataset.stepPage = i;
        });
      }

      if (navNumbers.length > 0) {
        navNumbers.forEach((item, i) => {
          ++i;
          item.dataset.stepTarget = i;
          item.textContent = i;
        });
      }
    }

    // Funciones
    function changeStep(e) {
      if (e.target.classList.contains("form-steps__btn")) {
        // Current
        let currentStep = e.target.dataset.stepPage;
        let currentStepSection = e.target.parentElement;
        let currentNavItem = stepsNav.querySelector(
          `[data-step-target="${e.target.dataset.stepPage}"]`
        );

        // Next
        let nextStep = ++currentStep;
        let nextStepSection = formSteps.querySelector(
          `[data-step-page="${nextStep}"]`
        );
        let nextNavItem = stepsNav.querySelector(
          `[data-step-target="${nextStep}"]`
        );

        if (e.target.classList.contains("form-steps__btn--support")) {
          if (!validateSupport(e.target)) {
            return;
          }
        }

        // Si existe la siguiente sección
        if (nextStepSection) {
          // Eliminar el paso anterior
          currentStepSection.classList.remove("show");
          currentNavItem.classList.remove("active");

          // Solución para rastro
          currentNavItem.classList.add("check");
          currentNavItem.parentElement.classList.add("color-bar");
          currentNavItem.innerHTML = '<i class="fa fa-check"></i>';

          // Mostrar paso siguiente
          nextStepSection.classList.add("show");
          nextNavItem.classList.add("active");

          // Modificaciones de las páginas
          setPaddingToInputs();
          configNavDesc();
        }
      }
    }

    // Validar los pasos para apoyar
    function validateSupport(button) {
      const itemsActive = Array.from(
        document.querySelectorAll(".support-nav__item.active")
      );
      const sectionsActive = itemsActive.map((item) =>
        document.querySelector(item.getAttribute("href"))
      );

      const arrResultG = sectionsActive.map((section) => {
        if (section) {
          if (
            section.querySelector('[type="checkbox"]:not(.optional):checked')
          ) {
            const inputs = section.querySelectorAll(
              'input:not([type="checkbox"])'
            );
            if (inputs.length > 0) {
              const arrayResult = [];
              inputs.forEach((input) => {
                if (input.value !== "" && input.validity.valid) {
                  arrayResult.push(true);
                } else {
                  arrayResult.push(false);
                }
              });
              if (arrayResult.includes(false)) {
                Swal.fire({
                  icon: "warning",
                  text: "Llena los campos correctamente para continuar",
                  button: false,
                });
              }
              return arrayResult.includes(false) ? false : true;
            }
            return true;
          }
          Swal.fire({
            icon: "warning",
            text: "Configurar primero para poder continuar",
            button: false,
          });
          return false;
        }
      });

      return arrResultG.includes(false) ? false : true;
    }

    // Ir al paso anterior :D
    function beforeStep(e) {
      // Obtener la vista actual
      let currentStep = getCurrentStep();
      if (currentStep !== 1) {
        e.preventDefault();
      }
      let currentStepSection = formSteps.querySelector(
        `section[data-step-page="${currentStep}"]`
      );
      let currentNavItem = stepsNav.querySelector(
        `[data-step-target="${currentStep}"]`
      );

      // Solución para rastro
      currentNavItem.classList.remove("check");
      if (
        currentStep ==
        document.querySelector('[data-step-desc="Confirma"]').dataset.stepPage
      ) {
        currentNavItem.parentElement.classList.remove("color-bar");
      } else {
        currentNavItem.parentElement.previousElementSibling.classList.remove(
          "color-bar"
        );
      }
      currentNavItem.innerHTML = currentNavItem.dataset.stepTarget;

      // Prev
      let prevStep = --currentStep;
      let prevStepSection = formSteps.querySelector(
        `[data-step-page="${prevStep}"]`
      );
      let prevNavItem = stepsNav.querySelector(
        `[data-step-target="${prevStep}"]`
      );

      // Eliminar el paso actual
      currentStepSection.classList.remove("show");
      currentNavItem.classList.remove("active");

      // Mostrar paso anterior
      prevStepSection.classList.add("show");
      prevNavItem.classList.add("active");
      prevNavItem.innerHTML = prevNavItem.dataset.stepTarget;

      // Modificaciones de las páginas
      setPaddingToInputs();
      configNavDesc();
    }

    function getCurrentStep() {
      return Number(formSteps.querySelector(".show").dataset.stepPage);
    }

    function setPaddingToInputs() {
      if (formStepsContainer.length > 0) {
        formStepsContainer.forEach((container) => {
          const placeholder = container.querySelector(
            ".form-control-steps__placeholder"
          );
          if (placeholder) {
            const padding = placeholder.getBoundingClientRect().width;

            container.querySelector(
              ".form-control-steps"
            ).style.paddingLeft = `calc(2em + ${padding}px)`;
          }
        });
      }
    }

    function configNavDesc() {
      const currentStep = getCurrentStep();
      const currentNavItem = stepsNav.querySelector(
        `[data-step-target="${currentStep}"]`
      );
      const currentStepSection = formSteps.querySelector(
        `section[data-step-page="${currentStep}"]`
      );
      const desc = currentStepSection.dataset.stepDesc;

      const left = currentNavItem.offsetLeft;
      let html = `
				<p>Paso ${currentStep}</p>
				<p>${desc}</p>
			`;

      stepNavDesc.style.left = `${left}px`;
      stepNavDesc.innerHTML = html;
    }
  }
})();

/* Adaptar alto de secciones */
(() => {
  const calculateHeightEl = document.querySelector(".calculate-height");
  const dashboardTitle = document.querySelector(".dashboard-title");

  if (calculateHeightEl && dashboardTitle) {
    calculateHeight();
    window.addEventListener("resize", calculateHeight);
  }

  function calculateHeight() {
    const height = dashboardTitle.getBoundingClientRect().height;
    const bottom = dashboardTitle.getBoundingClientRect().bottom;

    /* Tener en cuenta el CSS */
    if (matchMedia("screen and (min-width: 1200px)").matches) {
      calculateHeightEl.style.height = `calc(100% - (${height}px + 2rem))`;
    } else if (matchMedia("screen and (min-width: 567px)").matches) {
      calculateHeightEl.style.height = `calc(100% - (${height}px + 5rem))`;
    } else {
      calculateHeightEl.style.height = "";
    }
  }
})();

// Input type color
(() => {
  const inputWrapper = document.querySelector(".input-color-wrapper");

  if (inputWrapper) {
    const input = inputWrapper.querySelector("input");
    input.addEventListener("input", () => {
      inputWrapper.style.background = input.value;
    });
  }
})();

// Seleccionar como quieres que apoyen el Gate
(() => {
  const supportNav = document.querySelector(".support-nav");
  const btnSupport = document.querySelector(
    '[data-step-desc="Pasos"] button[data-step-page]'
  );
  const supportSections = document.querySelector(".support-sections");

  if (supportNav) {
    supportNav.addEventListener("click", activeSupport);

    function activeSupport(e) {
      e.preventDefault();
      let target;

      // Ver si el padre o el hijo son .support-nav__item
      if (e.target.classList.contains("support-nav__item")) {
        target = e.target;
      } else if (
        e.target.parentElement.classList.contains("support-nav__item")
      ) {
        target = e.target.parentElement;
      }

      // Si existe el target
      if (target) {
        if (target.classList.contains("active")) {
          removePrevShow();
          document
            .querySelector(target.getAttribute("href"))
            .classList.add("s-show");
        } else {
          if (canNext()) {
            target.classList.add("active");

            removePrevShow();
            document
              .querySelector(target.getAttribute("href"))
              .classList.add("s-show");
          }
        }
      } else if (e.target.classList.contains("deselect-icon")) {
        e.target.parentElement.parentElement.classList.remove("active");

        const removeSection = document.querySelector(
          e.target.parentElement.parentElement.getAttribute("href")
        );

        removeSection.classList.remove("s-show");

        removeSection
          .querySelectorAll('[type="checkbox"]:checked')
          .forEach((checkbox) => {
            checkbox.checked = false;
          });

        removeSection
          .querySelectorAll('input:not([type="checkbox"])')
          .forEach((input) => {
            input.value = "";
          });
      }
    }
  }

  // Esta funcion retorna true si se puede seleccionar otro paso y false si no
  function canNext() {
    const sectionActive = document.querySelector(".s-show");

    if (sectionActive) {
      if (
        sectionActive.querySelector('[type="checkbox"]:not(.optional):checked')
      ) {
        const inputs = sectionActive.querySelectorAll(
          'input:not([type="checkbox"])'
        );
        if (inputs.length > 0) {
          const arrayResult = [];
          inputs.forEach((input) => {
            if (input.value !== "" && input.validity.valid) {
              arrayResult.push(true);
            } else {
              arrayResult.push(false);
            }
          });
          if (arrayResult.includes(false)) {
            Swal.fire({
              icon: "warning",
              text: "Llena los campos correctamente para continuar",
              button: false,
            });
          }
          return arrayResult.includes(false) ? false : true;
        }
        return true;
      }
      Swal.fire({
        icon: "warning",
        text: "Configurar primero para poder continuar",
        button: false,
      });
      return false;
    }
    return true;
  }

  function removePrevShow() {
    document.querySelectorAll(".support-section").forEach((item) => {
      if (item.classList.contains("s-show")) {
        item.classList.remove("s-show");
      }
    });
  }
})();

class validateInput {
  constructor(inputs, button) {
    this.inputs = this.getInputs(inputs);
    this.button = button;
    this.handleInput = this.handleInput.bind(this);
    this.events();
  }
  events() {
    this.inputs.forEach((input) => {
      if (input) {
        input.addEventListener("input", this.handleInput);
      }
    });
  }
  getInputs(inputs) {
    return inputs.map((input) => document.querySelector(input));
  }
  handleInput(e) {
    const inp = e.target;
    const btn = this.button;

    // Añadir clase si el input contiene texto
    if (inp.value.length !== 0) {
      inp.classList.add("non-empty");
    } else {
      inp.classList.remove("non-empty");
    }

    // Opciones del Boton
    if (this.inputs.every((inp) => inp.validity.valid === true)) {
      btn.removeAttribute("disabled");
    } else {
      btn.setAttribute("disabled", "true");
    }
  }
}

// Validaciones de Steps - Activar botones
(() => {
  // input step 1
  new validateInput(
    ["#url-demo"],
    document.querySelector('[data-step-desc="Fuente"] button[data-step-page]')
  );
  new validateInput(
    ["#url-track"],
    document.querySelector('[data-step-desc="Subir"] button[data-step-page]')
  );
  // input step 4
  if (document.querySelector("#music-price")) {
    new validateInput(
      ["#artist-name", "#music-title", "#music-desc", "#music-price"],
      document.querySelector('[data-step-desc="Título"] button[data-step-page]')
    );
  } else {
    new validateInput(
      ["#artist-name", "#music-title", "#music-desc"],
      document.querySelector('[data-step-desc="Título"] button[data-step-page]')
    );
  }

  // otro genero
  const gender = document.getElementById("gender");
  const otherGender = document.getElementById("other-gender");

  if (gender && otherGender) {
    const btnGender =
      gender.parentElement.parentElement.parentElement.querySelector(
        "button[data-step-page]"
      );
    otherGender.addEventListener("input", () => {
      if (otherGender.validity.valid) {
        btnGender.removeAttribute("disabled");
      } else {
        btnGender.setAttribute("disabled", "true");
      }
    });

    gender.addEventListener("change", () => {
      const option = gender.options[gender.selectedIndex].value;

      if (option === "other") {
        otherGender.removeAttribute("disabled");
        otherGender.setAttribute("required", "true");
        btnGender.setAttribute("disabled", "true");
      } else if (option === "default") {
        otherGender.value = "";
        otherGender.setAttribute("disabled", "true");
        btnGender.setAttribute("disabled", "true");
      } else {
        otherGender.value = "";
        otherGender.setAttribute("disabled", "true");
        btnGender.removeAttribute("disabled");
      }
    });
  }

  // Validación url del gate
  const gateLink = document.getElementById("gate-link");
  const buttonGateLink = document.querySelector(
    '[data-step-desc="Privacidad"] button[data-step-page]'
  );
  const gateLinkOutput = document.getElementById("gate-link-output");

  if (gateLink) {
    gateLink.addEventListener("input", (e) => {
      if (
        gateLink.value !== "" &&
        gateLink.value.indexOf(" ") === -1 &&
        gateLink.value.indexOf("ñ") === -1 &&
        gateLink.value.indexOf("Ñ") === -1
      ) {
        gateLink.style.borderColor = "lime";
        buttonGateLink.removeAttribute("disabled");
        gateLinkOutput.querySelector("span").innerHTML =
          gateLink.value.toLowerCase();
      } else {
        gateLinkOutput.querySelector("span").innerHTML = "";
        gateLink.style.borderColor = "red";
        buttonGateLink.setAttribute("disabled", true);
      }
    });
  }
})();

// Desing preview
(() => {
  const subirarchivo_flyr = (event) => {
    const archivos = event.target.files;
    const data = new FormData();

    data.append("archivo", archivos[0]);

    fetch("/create-file-gate/archivo", {
      method: "POST",
      body: data,
    })
      .then((response) => response.json())
      .then((data) => {
        document.getElementById("resultado_imagen").innerHTML =
          "La imagen se ha subido correctamente.";
        document.getElementById("img_flyer").value = archivos[0].name;
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Upload gate flyer
  const uploadFlyer = document.getElementById("upload-flyer");
  const outputImg = document.querySelector(".desing-preview__content");
  const output = document.getElementById("output-upload-flyer");
  const dropUploadFlyer = document.getElementById("drop-upload-flyer");
  const btnStepDesing = document.querySelector(
    '[data-step-desc="Diseño"] button[data-step-page]'
  );
  const confirmationCardBannerImg = document.querySelector(
    ".confirmation-card__banner img"
  );

  if (uploadFlyer) {
    uploadFlyer.addEventListener("change", (event) => {
      const file = uploadFlyer.files[0];

      if (
        file.type !== "image/jpeg" &&
        file.type !== "image/png" &&
        file.type !== "image/jpg"
      ) {
        output.innerHTML = `<p class="mt-2 mb-0 text-danger">Solo se puden subir archivos .png, .jpg, .jpeg. Intenta de nuevo</p>`;
        setTimeout(() => {
          output.innerHTML = "";
        }, 5000);
        btnStepDesing.setAttribute("disabled", true);
        return;
      }

      const reader = new FileReader();
      reader.addEventListener("load", displayFileInfo);
      reader.readAsDataURL(file);
      subirarchivo_flyr(event);
    });

    dropUploadFlyer.addEventListener("dragenter", enterFile);
    dropUploadFlyer.addEventListener("dragover", overFile);
    dropUploadFlyer.addEventListener("dragleave", leaveFile);
    dropUploadFlyer.addEventListener("drop", dropFile);

    function enterFile(e) {
      e.preventDefault();
      dropUploadFlyer.style.borderColor = "#D9AD26";
    }

    function overFile(e) {
      e.preventDefault();
    }

    function leaveFile(e) {
      e.preventDefault();
      dropUploadFlyer.style.borderColor = "";
    }

    function dropFile(e) {
      e.preventDefault();

      const data = e.dataTransfer;
      const file = data.files[0];

      dropUploadFlyer.style.borderColor = "";
      uploadingProccess(file);
    }

    function uploadingProccess(file) {
      // calcular mb
      const size = file.size / 1048576;

      if (
        file.type !== "image/jpeg" &&
        file.type !== "image/png" &&
        file.type !== "image/jpg"
      ) {
        output.innerHTML = `<p class="mt-2 mb-0 text-danger">Solo se puden subir archivos .png, .jpg, .jpeg. Intenta de nuevo</p>`;
        setTimeout(() => {
          output.innerHTML = "";
        }, 5000);
        btnStepDesing.setAttribute("disabled", true);
        return;
      }

      const reader = new FileReader();
      reader.addEventListener("load", displayFileInfo);
      reader.readAsDataURL(file);
    }
  }

  function displayFileInfo(e) {
    const img = document.createElement("img");
    img.setAttribute("src", e.target.result);

    img.addEventListener("load", () => {
      if (img.naturalWidth < 1000 || img.naturalHeight < 1000) {
        output.innerHTML = `<p class="mt-2 mb-0 text-danger">El tamaño mínimo de tu imágen debe ser 1000px x 1000px</p>`;
        setTimeout(() => {
          output.innerHTML = "";
        }, 5000);
        btnStepDesing.setAttribute("disabled", true);
        return;
      }

      confirmationCardBannerImg.setAttribute("src", e.target.result);
      outputImg.style.backgroundImage = `url(${e.target.result})`;
      outputImg.style.backgroundSize = "cover";
      outputImg.querySelector(".before").style.display = "none";
      btnStepDesing.removeAttribute("disabled");
    });
  }

  // Change preview
  const desingPreview = document.querySelector(".desing-preview");
  const desingSocial = document.getElementById("desing-social");

  if (desingSocial) {
    desingSocial.addEventListener("change", toggleDesingSocial);

    function toggleDesingSocial() {
      const socialNav = desingPreview.querySelector(
        ".main-gate__footer > .row > *:first-child"
      );
      if (desingSocial.checked) {
        socialNav.classList.remove("d-none");
      } else {
        socialNav.classList.add("d-none");
      }
    }
  }

  const showWaterMarker = document.getElementById("show-watermarker");

  if (showWaterMarker) {
    showWaterMarker.addEventListener("change", toggleWaterMarker);

    function toggleWaterMarker() {
      const waterMarker = desingPreview.querySelector(".watermark");

      if (showWaterMarker.checked) {
        waterMarker.classList.add("d-none");
      } else {
        waterMarker.classList.remove("d-none");
      }
    }
  }

  // User logo
  const subirarchivo_logo = (event) => {
    const archivos = event.target.files;
    const data = new FormData();

    data.append("archivo", archivos[0]);

    fetch("/create-file-gate/archivo", {
      method: "POST",
      body: data,
    })
      .then((response) => response.json())
      .then((data) => {
        // document.getElementById('resultado_imagen').innerHTML = 'La imagen se ha subido correctamente.';
        console.log("La imagen se ha subido correctamente.");
        document.getElementById("logo_flyer").value = archivos[0].name;
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const userLogo = document.getElementById("user-logo");

  if (userLogo) {
    userLogo.addEventListener("change", (event) => {
      uploadUserLogo(event);
    });

    const output = document.getElementById("output-user-logo");

    userLogo.addEventListener("click", (e) => {
      const logo = outputImg.querySelector(".user-logo");

      if (logo) {
        userLogo.classList.remove("checked");
        e.preventDefault();
        logo.remove();
      }
    });

    function uploadUserLogo(event) {
      const file = userLogo.files[0];

      if (
        file.type !== "image/jpeg" &&
        file.type !== "image/png" &&
        file.type !== "image/jpg"
      ) {
        userLogo.classList.remove("checked");
        output.innerHTML = `<p class="mt-2 mb-0 text-danger">Solo se puden subir archivos .png, .jpg, .jpeg</p>`;
        setTimeout(() => {
          output.innerHTML = "";
        }, 5000);
        return;
      }

      userLogo.classList.add("checked");
      const reader = new FileReader();
      reader.addEventListener("load", changeWaterMarker);
      reader.readAsDataURL(file);
      subirarchivo_logo(event);
    }

    function changeWaterMarker(e) {
      if (desingPreview.querySelector(".user-logo")) {
        desingPreview.querySelector(".user-logo").remove();
      }

      //const logo = document.createElement('img');
      const logo = document.getElementById("logo-change");
      //logo.classList.add('user-logo');
      logo.setAttribute("src", e.target.result);

      //outputImg.appendChild(logo);
    }
  }
})();

// Select Music
(() => {
  const subirarchivo_zip = (event) => {
    const archivos = event.target.files;
    const data = new FormData();

    data.append("archivo", archivos[0]);

    fetch("/create-file-gate/archivo", {
      method: "POST",
      body: data,
    })
      .then((response) => response.json())
      .then((data) => {
        document.getElementById("resultado_zip").innerHTML =
          "El archivo " + archivos[0].name + " se ha subido correctamente.";
        document.getElementById("archivo1").value = archivos[0].name;
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const musicFile = document.getElementById("music-file");

  if (musicFile) {
    const fileOutput = document.getElementById("file-output");
    const iconState = document.getElementById("drop-icon");
    const button = musicFile.parentElement.parentElement.querySelector(
      "button[data-step-page]"
    );

    // With Drag and Drop
    const dropArea = document.getElementById("upload-audio");
    const infoDrop = dropArea.querySelector(".info-drop");

    musicFile.addEventListener("change", (event) => {
      const file = musicFile.files[0];

      uploadingProccess(file, event);
    });

    dropArea.addEventListener("dragenter", enterFile);
    dropArea.addEventListener("dragover", overFile);
    dropArea.addEventListener("dragleave", leaveFile);
    dropArea.addEventListener("drop", dropFile);

    function enterFile(e) {
      e.preventDefault();
      dropArea.style.borderColor = "#D9AD26";
    }

    function overFile(e) {
      e.preventDefault();
    }

    function leaveFile(e) {
      e.preventDefault();
      dropArea.style.borderColor = "";
    }

    function dropFile(e) {
      e.preventDefault();

      const data = e.dataTransfer;
      const file = data.files[0];

      dropArea.style.borderColor = "";
      uploadingProccess(file);
    }

    function uploadingProccess(file, event) {
      // calcular mb
      const size = file.size / 1048576;
      const maxSizeFile = musicFile.dataset.maxSizeFile;

      if (maxSizeFile !== "unlimited") {
        if (size > Number(maxSizeFile)) {
          dropArea.classList.add("drop-error", "text-center");
          iconState.innerHTML = '<i class="fa fa-times"></i>';
          infoDrop.innerHTML = `No puedes subir archivos mayores a ${
            maxSizeFile === "10" ? "10mb" : "1gb"
          } actualiza tu membresía<br><label for="music-file">Sube otro archivo</label> o arratralo aquí`;
          return;
        }
      }

      if (musicFile.getAttribute("accept") === "audio/*, .zip, .rar") {
        if (
          file.type !== "audio/mpeg" &&
          file.type !== "audio/mp3" &&
          file.type !== "audio/wav" &&
          file.type !== "audio/aiff" &&
          file.type !== "application/zip"
        ) {
          dropArea.classList.add("drop-error", "text-center");
          iconState.innerHTML = '<i class="fa fa-times"></i>';
          infoDrop.innerHTML = `Solo se pueden subir archivos .mp3, .mpeg, .wav, .aiff, .zip<br><label for="music-file">Sube otro archivo</label> o arratralo aquí`;
          return;
        }
      } else {
      }
      subirarchivo_zip(event);
      dropArea.classList.remove("uploading", "drop-error");
      dropArea.classList.add("success", "text-center");
      iconState.innerHTML = '<i class="fa fa-check"></i>';
      // infoDrop.innerHTML = `<p>El archivo se subio correctamente<br><label for="music-file">Sube otro</label> o arrastralo aquí</p>`;
      infoDrop.innerHTML = `<p>El archivo se cargó correctamente</p>`;
      button.removeAttribute("disabled");
    }
  }
})();

// Llenar previsualizacion de los steps del form
(() => {
  const artistName = document.getElementById("artist-name");
  const musicTitle = document.getElementById("music-title");
  const musicDesc = document.getElementById("music-desc");
  const urlDemo = document.getElementById("url-demo");
  const gender = document.getElementById("gender");
  const gateLink = document.getElementById("gate-link");

  const previewList = document.getElementById("confirmation-list");

  if (previewList) {
    artistName.addEventListener("input", setPreview);
    musicTitle.addEventListener("input", setPreview);
    musicDesc.addEventListener("input", setPreview);
    gateLink.addEventListener("input", setPreview);
    if (urlDemo) {
      urlDemo.addEventListener("input", setPreview);
    }
    //	gender.addEventListener('change', setPreview);
  }

  function setPreview() {
    let html = `
			<li>Artista: <span>${artistName.value}</span></li>
			<li>Título: <span>${musicTitle.value}</span></li>
			<li>Descripción: <span>${musicDesc.value}</span></li>
			${urlDemo ? `<li>Fuente: <span>${urlDemo.value}</span></li>` : ""}
			<li>Enlace: <span id="p1">https://josea.mosquedacordova.com/track/${gateLink.value.toLowerCase()}</span><i class="fa fa-copy" onclick="copyToClipboard('#p1')"  style="margin-left: 5px; cursor: pointer;"></i></li>
		`;

    previewList.innerHTML = html;
  }
})();

// Padding to inputs
(() => {
  const formStepsContainer = document.querySelectorAll(
    ".form-control-steps__container"
  );

  if (formStepsContainer.length > 0) {
    formStepsContainer.forEach((container) => {
      const placeholder = container.querySelector(
        ".form-control-steps__placeholder"
      );
      if (placeholder) {
        const padding = placeholder.getBoundingClientRect().width;

        container.querySelector(
          ".form-control-steps"
        ).style.paddingLeft = `calc(2em + ${padding}px)`;
      }
    });
  }
})();

(() => {
  const gatesNavigation = document.getElementById("gates-navigation");

  if (gatesNavigation) {
    const gatesNavItems = gatesNavigation.querySelectorAll(".nav-link");
    gatesNavigation.addEventListener("click", changeGates);

    function changeGates(e) {
      if (e.target.classList.contains("nav-link")) {
        e.preventDefault();

        if (!e.target.classList.contains("sb-disabled")) {
          gatesNavItems.forEach((item) => {
            if (item.classList.contains("active")) {
              item.classList.remove("active");
            }
          });

          e.target.classList.add("active");
        }
      }
    }
  }
})();

// Subir foto de perfil
(() => {
  const subirImagen = (event) => {
    const archivos = event.target.files;
    const data = new FormData();

    data.append("archivo", archivos[0]);

    fetch("/update-profile/archivo", {
      method: "POST",
      body: data,
    })
      .then((response) => response.json())
      .then((data) => {
        document.getElementById("resultado").innerHTML =
          "El archivo " + archivos[0].name + " se ha subido correctamente.";
        document.getElementById("profile_img_").value = archivos[0].name;
         const outputImg = document.getElementById("imageSelected");
         outputImg.setAttribute("src", "assets/img_up/"+archivos[0].name);
        
         
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const formUpdateProfile = document.getElementById('form_datos_cuenta')
  const profileImg = document.getElementById("profile-img");
  const dropUploadProfileImg = document.getElementById("upload-user-img");

  if (profileImg) {
    profileImg.addEventListener("change", (event) => {
      const file = profileImg.files[0];

      if (
        file.type !== "image/jpeg" &&
        file.type !== "image/png" &&
        file.type !== "image/jpg"
      ) {
        alert("Elige un archivo válido (.png, .jpg, .jpeg)");
        return;
      }

      const reader = new FileReader();
      reader.addEventListener("load", displayFileInfo);
      reader.readAsDataURL(file);
      console.log(file);
      subirImagen(event);
      if (formUpdateProfile) {
        //formUpdateProfile.submit()
        }
    });

    dropUploadProfileImg.addEventListener("dragenter", enterFile);
    dropUploadProfileImg.addEventListener("dragover", overFile);
    dropUploadProfileImg.addEventListener("dragleave", leaveFile);
    dropUploadProfileImg.addEventListener("drop", dropFile);

    function enterFile(e) {
      e.preventDefault();
      dropUploadProfileImg.style.borderColor = "#D9AD26";
    }

    function overFile(e) {
      e.preventDefault();
    }

    function leaveFile(e) {
      e.preventDefault();
      dropUploadProfileImg.style.borderColor = "";
    }

    function dropFile(e) {
      e.preventDefault();

      const data = e.dataTransfer;
      const file = data.files[0];

      dropUploadProfileImg.style.borderColor = "";
      uploadingProccess(file);
    }

    function uploadingProccess(file) {
      // calcular mb
      const size = file.size / 1048576;

      if (
        file.type !== "image/jpeg" &&
        file.type !== "image/png" &&
        file.type !== "image/jpg"
      ) {
        alert("Elige un archivo válido (.png, .jpg, .jpeg)");
        return;
      }

      const reader = new FileReader();
      reader.addEventListener("load", displayFileInfo);
      reader.readAsDataURL(file);
    }

    function displayFileInfo(e) {
      const outputImg = document.createElement("img");
      outputImg.setAttribute("src", e.target.result);

      dropUploadProfileImg.parentElement.classList.add("divider");
      if (
        document.querySelector(
          ".img-fluid"
        )
      ) {
        document
          .querySelector(".img-fluid")
          .remove();
      }
      dropUploadProfileImg.parentElement.appendChild(outputImg);
    }
  }
})();

// Validaciones de update user
(() => {
  // Campos
  const formUpdateProfile = document.getElementById("form-update-profile");

  if (formUpdateProfile) {
    const btnSubmit = formUpdateProfile.querySelector('[type="submit"]');

    const inputs = Array.from(formUpdateProfile.elements);

    inputs.forEach((input) => {
      if (input.getAttribute("type") === "submit") {
        input.addEventListener("click", (e) => {
          e.preventDefault();
        });
      } else if (
        input.getAttribute("type") === "text" ||
        input.getAttribute("type") === "password" ||
        input.getAttribute("type") === "email"
      ) {
        input.addEventListener("input", validateCamps);
      } else {
        input.addEventListener("change", validateCamps);
      }
    });

    btnSubmit.addEventListener("click", (e) => {
      const password = document.getElementById("password");
      const confirmPassword = document.getElementById("confirm-password");

      if (password.value !== confirmPassword.value) {
        e.preventDefault();
        Swal.fire({
          icon: "warning",
          text: "Las contraseñas no coinciden",
          button: false,
        });
      } else {
        formUpdateProfile.submit();
      }
    });

    function validateCamps(e) {
      const inputs = Array.from(formUpdateProfile.elements);

      if (e.target.validity.valid && e.target.value !== e.target.defaultValue) {
        e.target.style.borderColor = "lime";
        e.target.classList.add("camp-valid");
      } else {
        e.target.style.borderColor = "";
        e.target.classList.remove("camp-valid");
      }

      const ArrRes = [];
      inputs.forEach((input) => {
        if (input.classList.contains("camp-valid")) {
          ArrRes.push(true);
        } else {
          ArrRes.push(false);
        }
      });

      if (ArrRes.includes(true)) {
        btnSubmit.removeAttribute("disabled");
      } else {
        btnSubmit.setAttribute("disabled", true);
      }
    }
  }
})();
// Validaciones de crear plan
(() => {
  // Campos
  const formUpdateProfile = document.getElementById("form-create-plan");

  if (formUpdateProfile) {
    const btnSubmit = formUpdateProfile.querySelector('[type="submit"]');

    const inputs = Array.from(formUpdateProfile.elements);

    inputs.forEach((input) => {
      if (input.getAttribute("type") === "submit") {
        input.addEventListener("click", (e) => {
          e.preventDefault();
        });
      } else if (input.getAttribute("type") === "text") {
        input.addEventListener("input", validateCamps);
      } else {
        input.addEventListener("change", validateCamps);
      }
    });

    btnSubmit.addEventListener("click", (e) => {
      let todoCorrecto = true;
      for (var i = 0; i < formUpdateProfile.length; i++) {
        if (
          formUpdateProfile[i].type == "text" ||
          formUpdateProfile[i].type == "email"
        ) {
          if (
            formUpdateProfile[i].name == "tiktok" ||
            formUpdateProfile[i].name == "twitter" ||
            formUpdateProfile[i].name == "spotify" ||
            formUpdateProfile[i].name == "souncloud" ||
            formUpdateProfile[i].name == "mixcloud" ||
            formUpdateProfile[i].name == "youtube" ||
            formUpdateProfile[i].name == "facebook" ||
            formUpdateProfile[i].name == "detalles" ||
            formUpdateProfile[i].name == "instagram"  ||
            formUpdateProfile[i].name == "descuento"
          ) {
            todoCorrecto = true;
          } else if (
            formUpdateProfile[i].value == null ||
            formUpdateProfile[i].value.length == 0 ||
            /^\s*$/.test(formUpdateProfile[i].value)
          ) {
            Swal.fire({
              icon: "warning",
              text:
                formUpdateProfile[i].name +
                " no puede estar vacío o contener sólo espacios en blanco",
              button: true,
            });

            todoCorrecto = false;
          }
        }
      }

      if (todoCorrecto == true) {
        formUpdateProfile.submit();
        console.log("hola");
      }
    });

    function validateCamps(e) {
      const inputs = Array.from(formUpdateProfile.elements);

      if (e.target.validity.valid && e.target.value !== e.target.defaultValue) {
        e.target.style.borderColor = "lime";
        e.target.classList.add("camp-valid");
      } else {
        e.target.style.borderColor = "";
        e.target.classList.remove("camp-valid");
      }

      const ArrRes = [];
      inputs.forEach((input) => {
        if (input.classList.contains("camp-valid")) {
          ArrRes.push(true);
        } else {
          ArrRes.push(false);
        }
      });

      if (ArrRes.includes(true)) {
        btnSubmit.removeAttribute("disabled");
      } else {
        btnSubmit.setAttribute("disabled", true);
      }
    }
  }
})();
// Añadir más campos a los pasos
(() => {
  const otherContainers = document.querySelectorAll(".other-container");
  if (otherContainers.length > 0) {
    otherContainers.forEach((otherContainer) => {
      otherContainer.addEventListener("click", (e) => {
        if (e.target.classList.contains("add-other__btn")) {
          if (!document.querySelector('[data-step-desc="Pasos"].basic')) {
            if (!document.querySelector('[data-step-desc="Pasos"].gold')) {
              if (
                otherContainer.querySelectorAll(".remove-other__btn").length < 4
              ) {
                const oInput = e.target.parentElement.querySelector("input");
                let contar_container =
                  otherContainer.querySelectorAll(".remove-other__btn").length +
                  1;
                console.log(contar_container);
                const other = `
									<div class="add-other mt-3">
										<input type="url" class="form-control-steps" name="" placeholder="${oInput.getAttribute(
                      "placeholder"
                    )}">
										<button type="button" class="remove-other__btn">
											<i class="fa fa-times"></i>
										</button>
									</div>
								`;
                $(otherContainers).append(other);
                //otherContainer.innerHTML += other;
              } else {
                Swal.fire({
                  icon: "warning",
                  title:
                    "Solo se pueden agregar campos ilimitados en suscripción Gold",
                  text: "Te invitamos a mejorar tu membresía",
                  button: false,
                });
              }
            } else {
              let contar_container =
                otherContainer.querySelectorAll(".remove-other__btn").length +
                1;
              const oInput = e.target.parentElement.querySelector("input");
              console.log(oInput.getAttribute("name") + contar_container);
              let name_input = oInput.getAttribute("name");
              const other = `
								<div class="add-other mt-3">
									<input type="url" class="form-control-steps" name="${name_input}" placeholder="${oInput.getAttribute(
                "placeholder"
              )}">
									<button type="button" class="remove-other__btn">
										<i class="fa fa-times"></i>
									</button>
								</div>
							`;
              $(otherContainers).append(other);
              //otherContainer.innerHTML += other;
            }
          } else {
            Swal.fire({
              icon: "warning",
              title: "Solo disponible para usuarios VIP y Gold",
              text: "Te invitamos a mejorar tu membresía",
              button: false,
            });
          }
        } else if (e.target.classList.contains("remove-other__btn")) {
          e.target.parentElement.remove();
        }
      });
    });
  }
})();

// Promocionar música
(() => {
  const promocionarMusica = document.getElementById("promocionar-musica");
  const btnPromocionar = document.getElementById("btn-promocionar");
  const formulario = document.getElementById("form_fans");
  //let checked = formulario.querySelectorAll('input[type=checkbox]:checked');
  let checkboxes = Array.from(
    document.getElementsByClassName("form-check-input")
  );
  const selected = "";

  if (promocionarMusica) {
    promocionarMusica.addEventListener("change", () => {
      const value =
        promocionarMusica.options[promocionarMusica.selectedIndex].value;
      let suma = 0;
      for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked != true) {
          suma = suma + 1;
        }
      }
      if (suma !== checkboxes.length && value !== "default") {
        btnPromocionar.removeAttribute("disabled");
        return;
      }

      btnPromocionar.setAttribute("disabled", true);
    });

    [...checkboxes].map((e) =>
      e.addEventListener("click", () => {
        const value =
          promocionarMusica.options[promocionarMusica.selectedIndex].value;
        let suma = 0;
        for (var i = 0; i < checkboxes.length; i++) {
          if (checkboxes[i].checked != true) {
            suma = suma + 1;
          }
        }
        if (suma !== checkboxes.length && value !== "default") {
          btnPromocionar.removeAttribute("disabled");
          return;
        }

        btnPromocionar.setAttribute("disabled", true);
      })
    );
  }
})();

// Boton Compartir
(() => {
  $("#prueba").on("click", ".share_fb", function (event) {
    console.log("hola");
    event.preventDefault();
    var that = $(this);
    var href = document.getElementById("url_facebook").innerHTML;
    var post = that.parents("article.post-area");
    $.ajax({ cache: true });
    $.getScript("//connect.facebook.net/en_US/sdk.js", function () {
      FB.init({
        appId: "1533357533669938",
        version: "v2.3", // or v2.0, v2.1, v2.0
      });
      FB.ui(
        {
          method: "share",
          title: "Title Goes here",
          description:
            "Description Goes here. Description Goes here. Description Goes here. Description Goes here. Description Goes here. ",
          href: href,
        },
        function (response) {
          if (response && !response.error_code) {
            Swal.fire("Gracias por compartir");
            let link = document.getElementById("descargar_link");
            link.style.pointerEvents = null;
          } else {
            Swal.fire({
              title: "Error!",
              text: "No le has dado compartir a nuestra pagina",
              icon: "error",
              confirmButtonText: "OK",
            });
            // setTimeout(function(){
            //	let link = document.getElementById('descargar_link')
            //	link.style.pointerEvents = null;
            //link.style.color = 'blue';
            //}, 2000);
          }
        }
      );
    });
  });
})();

// Boton Megusta
(() => {
  //$(".div_share").on('click', '.share_fb', function(event) {
  jQuery(".div_share").click(function (event) {
    var that = $(this);
    //var href = document.getElementById('url_facebook').innerHTML
    var post1 = that.parents(".label_url");
    var post =
      that.parents(".label_url").prevObject[0].nextElementSibling.innerHTML;

    var last = document.getElementById("nextBtn").innerHTML;
    console.log(post);
    var url = post;
    //var url = document.getElementById('url_facebook').innerHTML;
    var openDialog = function (uri, name, options, closeCallback) {
      var win = window.open(uri, name, options);
      var interval = window.setInterval(function () {
        try {
          if (win == null || win.closed) {
            clearInterval(interval);
            //window.setInterval(0)
            closeCallback(win);
            console.log("se cerro por click");
          }
        } catch (e) {}
      }, 2000);
      return win;
    };

    openDialog(url, "Social Media", "width=640,height=580", function () {
      let link = document.getElementById("descargar_link");
      if (last === "") {
        link.style.pointerEvents = null;
        link.classList.remove("btn_disabled");
      } else {
        $("#nextBtn").click();
      }
    });
  });
})();
// Añadir más campos a las preguntas
(() => {
  var maxField = 10; //Input fields increment limitation
  var addButton = $(".add-other__btn"); //Add button selector
  var pregunta = $(".other-container_ayuda"); //Input field pregunta
  //New input field html
  var x = 1; //Initial field counter is 1
  $(pregunta).on("click", (e) => {
    //Once add button is clicked
    if (e.target.classList.contains("add-other__btn")) {
      const oInput = e.target.parentElement.querySelector("input");
      let name_input = oInput.getAttribute("name");
      var preguntaField = `			
				<div class="col" >
			<label class="form-steps__title">Pregunta</label>	
				<input type="text" class="form-control-steps pregunta_input" name="pregunta" placeholder="Coloque aqui su pregunta" required>
				<button type="button" class="remove-other__btn" style="height: 35%;top: 40px" >
					<i class="fa fa-plus"></i>
				</button>
			</div>
			<div class="col">
				<label class="form-steps__title">Respuesta</label>					
				<input type="text" class="form-control-steps pregunta_input" id="respuesta" name="respuesta" placeholder="Nombre del canal" required>
				<button type="button" class="remove-other__btn" style="height: 35%;top: 40px" >
					<i class="fa fa-plus"></i>
				</button><!-- .col -->
			</div>	`;

      if (x < maxField) {
        //Check maximum number of input fields
        x++; //Increment field counter
        $(pregunta).append(preguntaField); // Add field html
        const btnayuda = document.getElementById("btn_Ayuda");
      }
    } else if (e.target.classList.contains("remove-other__btn")) {
      e.target.parentElement.remove();
      x--; //Decrement field counter
    }
  });
})();
// Visualizar terminos o preguntas
(() => {
  
})();

// Boton Copiar Portapapeles
(() => {
  var progress = document.getElementById("progress_");
  progress.addEventListener("click", adelantar);
  function adelantar(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * player.duration;
    player.currentTime = scrubTime;
    //console.log(e);
  }

  var currentTab = 0; // Current tab is set to be the first tab (0)
  showTab(currentTab); // Display the current tab

  function showTab(n) {
    // This function will display the specified tab of the form ...
    var x = document.getElementsByClassName("tab");
    x[n].style.display = "block";
    //x[n].style.display = "block";
    // ... and fix the Previous/Next buttons:
    if (n == 0) {
      document.getElementById("prevBtn").style.display = "none";
    } else {
      document.getElementById("prevBtn").style.display = "inline";
    }
    if (n == x.length - 1) {
      document.getElementById("nextBtn").innerHTML = "";
      document.getElementById("nextBtn").setAttribute("disabled", "disabled");
    } else {
      document.getElementById("nextBtn").innerHTML =
        "<i class='fa fa-angle-right' style='display:none'></i>";
    }
    // ... and run a function that displays the correct step indicator:
    fixStepIndicator(n);
  }

  function nextPrev(n) {
    // This function will figure out which tab to display
    var x = document.getElementsByClassName("tab");
    // Exit the function if any field in the current tab is invalid:
    if (n == 1 && !validateForm()) return false;
    // Hide the current tab:
    x[currentTab].style.display = "none";
    // Increase or decrease the current tab by 1:
    currentTab = currentTab + n;
    // if you have reached the end of the form... :
    if (currentTab >= x.length) {
      //...the form gets submitted:
      document.getElementById("regForm").submit();
      return false;
    }
    // Otherwise, display the correct tab:
    showTab(currentTab);
  }

  function validateForm() {
    // This function deals with validation of the form fields
    var x,
      y,
      i,
      valid = true;
    x = document.getElementsByClassName("tab");
    y = x[currentTab].getElementsByTagName("input");
    // A loop that checks every input field in the current tab:
    for (i = 0; i < y.length; i++) {
      // If a field is empty...
      if (y[i].value == "") {
        // add an "invalid" class to the field:
        y[i].className += " invalid";
        // and set the current valid status to false:
        valid = false;
      }
    }
    // If the valid status is true, mark the step as finished and valid:
    if (valid) {
      document.getElementsByClassName("step")[currentTab].className +=
        " finish";
    }
    return valid; // return the valid status
  }

  function fixStepIndicator(n) {
    // This function removes the "active" class of all steps...
    var i,
      x = document.getElementsByClassName("step");
    for (i = 0; i < x.length; i++) {
      x[i].className = x[i].className.replace(" active", "");
    }
    //... and adds the "active" class to the current step:
    x[n].className += " active";
  }
})();

(() => {
  const ayuda = document.getElementById("tipo");

  const formulario = document.getElementById("form_fans");
  //let checked = formulario.querySelectorAll('input[type=checkbox]:checked');
  let checkboxes = Array.from(
    document.getElementsByClassName("form-check-input")
  );
  const selected = "";
  const valor_terminos = document.getElementById("terminos");
  const valor_pregunta = $(".pregunta");
  const valor_respuesta = $(".respuesta");

  console.log(valor_pregunta);
  console.log(valor_respuesta);
  $(valor_pregunta).on("change", (e) => {
    //Once add button is clicked
    if (valor_pregunta.value != "" && valor_respuesta.value != "") {
      console.log("hola");
      btnayuda.removeAttribute("disabled");
      return;
    }
  });

  $(valor_terminos).on("change", (e) => {
    //Once add button is clicked
    if (valor_terminos.value != "") {
      console.log("hola2");
      btnayuda.removeAttribute("disabled");
      return;
    }
  });
})();

(() => {
  console.log("holaempresa")
   const formRegistrarEmpresa= document.getElementById("registrar_empresa")
   
   if (formRegistrarEmpresa) {
     console.log("hola")
    $('#logo_next').on('click', () =>{
      $('#logo-tab').click()
    })
    $('#basic_next').on('click', () =>{
      $('#basic-tab').click()
    })
    $('#banks_next').on('click', () =>{
      $('#banks-tab').click()
    })
    $('#empleados_next').on('click', () =>{
      $('#employed-tab').click()
    })
     
   $('#login_prev').on('click', () =>{
      $('#login-tab').click()
    })
  
    $('#logo_prev').on('click', () =>{
      $('#logo-tab').click()
    })
    $('#basic_prev').on('click', () =>{
      $('#basic-tab').click()
    })
    $('#banks_prev').on('click', () =>{
      $('#banks-tab').click()
    })
    $('#empleados_prev').on('click', () =>{
      $('#employed-tab').click()
    })
   }
  
})();

// Vista previa diseño Gate
