function StrikableText({stroked = false, children}) {
  return(
    (stroked ? (
      <s>{children}</s>
    ) : (
      <>{children}</>
    ))
  )
}

export default StrikableText