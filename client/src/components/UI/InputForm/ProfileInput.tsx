const ProfileInput = (props: {type: string, placeholder?: string, value?: string, onChange: any, accept?:string}) => {
  return (
    <input {...props} />
  );
};
export default ProfileInput;