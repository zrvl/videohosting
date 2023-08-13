const AuthInput = (props: {className?:string, placeholder: string, type: string, value: string, onChange: any}) => {
  return (
    <input {...props} />
  )
};
export default AuthInput;
