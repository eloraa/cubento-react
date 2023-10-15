import { key } from "localforage";

export const printPDF = pdfFile => {
    const screenHeight = window.innerHeight;
    const screenWidth = window.innerWidth;
    const url = URL.createObjectURL(pdfFile)
  
    const popupWidth = 450;
    const popupHeight = screenHeight * 0.9;
    const left = (screenWidth - popupWidth) / 2;
    const top = (screenHeight - popupHeight) / 2;
  
    const newWindow = window.open(
      url,
      '_blank',
      `width=${popupWidth},height=${popupHeight},left=${left},top=${top}`
    );
  
    newWindow.onload = function () {
      newWindow.print();
      newWindow.onafterprint = function () {
        newWindow.close();
      };
    };
    newWindow.onunload = function () {
        setTimeout(() => URL. revokeObjectURL(url), 1)
    }
  };
  
