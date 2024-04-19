export const openPopup = (url: string, width?: number, height?: number) => {
  const innerWidth = width ?? 400;
  const innerHeight = height ?? 600;

  const left = (window.innerWidth - innerWidth) / 2;
  const top = (window.innerHeight - innerHeight) / 2;

  const popupWindow = window.open(
    url,
    '_blank',
    `width=${innerWidth},height=${innerHeight},left=${left},top=${top}`,
  );

  if (
    !popupWindow ||
    popupWindow.closed ||
    typeof popupWindow.closed === 'undefined'
  ) {
    alert('팝업이 차단되었습니다. 팝업 창을 허용해주세요.');
  }
};
