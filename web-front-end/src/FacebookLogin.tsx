import React from 'react';
export const FacebookLogin: React.FC = () => {
  return (
    <div
      className="fb-login-button"
      data-width=""
      data-size="large"
      data-button-type="login_with"
      data-auto-logout-link="true"
      data-use-continue-as="true"
    />
  )
}
