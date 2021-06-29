import Choices from "choices.js";
import "choices.js/src/styles/choices.scss";

export const choicesSelect = () => {
  try {
    const select = new Choices(".bs-form-select select", {
      searchEnabled: false,
      itemSelectText: "",
      placeholder: true,
    });
  } catch (e) {
    console.warn("Choices.js", e.message);
  }
};

export const fileDropZone = () => {
  // drop zone works only with one file
  const dropZoneContainers = document.querySelectorAll(
    ".bs-file-upload-drop-zone"
  );

  const preventDefaults = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    let dt = e.dataTransfer;
    let fileList = dt.files;
    // only one file handled, do any logic with it
    return fileList.item(0);
  };

  const showFileNameInDropZone = (file, dropZone) => {
    const fileName = file?.split(/(\\|\/)/g)?.pop() ?? "";
    dropZone.innerHTML = fileName;
  };

  dropZoneContainers.forEach((container) => {
    const dropZone = container.querySelector(".drop-zone");
    const fileInput = container.querySelector("input[type='file']");

    const dropZonePlaceholder = dropZone.innerHTML;

    fileInput.addEventListener("change", (e) => {
      showFileNameInDropZone(e.currentTarget.value, dropZone);
    });

    ["dragenter", "dragover", "dragleave", "drop"].forEach((event) => {
      dropZone.addEventListener(event, preventDefaults, false);
    });

    dropZone.addEventListener(
      "drop",
      (event) => {
        const file = handleDrop(event);
        showFileNameInDropZone(file.name, dropZone);
      },
      false
    );
  });
};
