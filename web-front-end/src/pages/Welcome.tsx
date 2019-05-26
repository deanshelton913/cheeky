import React from 'react';
import './Welcome.scss';


interface Props {
}

interface State {
}


export class Welcome extends React.Component<Props, State> {

  render() {
    return (
    <section className="welcome-page">
      <button className="create button success">Create</button>
      <button className="find button">Search</button>
      <div className="divider"></div>
      <button className="create button">Curate</button>
    </section>
    )
 }
}