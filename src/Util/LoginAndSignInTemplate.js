import './LoginAndSignInTemplate.css';

const LoginandSignInTemplate = (props)=>{
    return(
  <div className="container-fluid ps-md-0">
  <div className="row g-0">
    <div className="d-none d-md-flex col-md-4 col-lg-6 bg-image"></div>
    <div className="col-md-8 col-lg-6">
      <div className="login d-flex align-items-center py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-9 col-lg-8 mx-auto">
                {props.children}
              </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
    )

}

export default LoginandSignInTemplate;