const AuthLayout = ({
  children
}: Readonly<{
  children: React.ReactNode
}>) => {
  return <div className='flex min-h-screen justify-center items-center'>{children}</div>
}

export default AuthLayout
