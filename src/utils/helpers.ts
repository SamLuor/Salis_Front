const updateHtmlClass = (darkTheme: boolean) => {
  const htmlElement = document.documentElement

  if (darkTheme) {
    htmlElement.classList.add('dark')
  } else {
    htmlElement.classList.remove('dark')
  }
}

export { updateHtmlClass }
