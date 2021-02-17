const modalOptions = (theme, colorMode) => {
  return {
    overlay: {
      backgroundColor:
        colorMode === 'dark'
          ? 'rgba(0, 0, 0, 0.95)'
          : 'rgba(247,248,249, 0.95)',
      zIndex: 10,
    },
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      borderRadius: '25px',
      width: '75%',
      maxWidth: '500px',
      height: 'auto',
      background: theme.colors.background,
      boxSizing: 'border-box',
      padding: 0,
    },
  }
}

export default modalOptions
