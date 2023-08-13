const Error = ({msg}: {msg: string | null}) => {
    return (
        <div className="alert alert-danger" role="alert">
            {msg}
        </div>
      )
};
export default Error;
