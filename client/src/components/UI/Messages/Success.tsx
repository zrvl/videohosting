const Success = ({msg}: {msg: string | null}) => {
  return (
    <div className="alert alert-success" role="alert">
        {msg}
    </div>
  )
};
export default Success;
