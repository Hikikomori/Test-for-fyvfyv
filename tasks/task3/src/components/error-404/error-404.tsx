import {Link} from "react-router-dom"

const Error404:React.FC = () => {
  return <div className="error-404 app__error-404">
    <h1 className="error-404__heading">
      Error 404
    </h1>
    <p className="error-404__description">
      The requested resource is not found
    </p>
    <Link to="/" className="error-404__return">
      <svg version="1.1"
           xmlns="http://www.w3.org/2000/svg"
           xmlnsXlink="http://www.w3.org/1999/xlink"
           x="0px" y="0px"
           viewBox="0 0 206.108 206.108"
           xmlSpace="preserve"
           width="20"
           height="20"
           className="error-404__return-icon">
        <path d="M152.774,69.886H30.728l24.97-24.97c3.515-3.515,3.515-9.213,0-12.728c-3.516-3.516-9.213-3.515-12.729,0L2.636,72.523
              c-3.515,3.515-3.515,9.213,0,12.728l40.333,40.333c1.758,1.758,4.061,2.636,6.364,2.636c2.303,0,4.606-0.879,6.364-2.636
              c3.515-3.515,3.515-9.213,0-12.728l-24.97-24.97h122.046c19.483,0,35.334,15.851,35.334,35.334s-15.851,35.334-35.334,35.334H78.531
              c-4.971,0-9,4.029-9,9s4.029,9,9,9h74.242c29.408,0,53.334-23.926,53.334-53.334S182.182,69.886,152.774,69.886z"/>
      </svg>
      Return to library
    </Link>
  </div>
};

export default Error404;
