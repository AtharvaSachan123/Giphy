import { FaInstagram, FaLinkedin, FaX } from "react-icons/fa6"

const FollowOn = () => {
  return (
    <div className="faded-text pt-2">

        <span>Follow on:</span>
        <div className="flex gap-4 pt-3">
            <a href="https://www.linkedin.com/in/atharva-sachan-975848252/">
                <FaLinkedin/>
            </a>
            <a href="https://www.linkedin.com/in/atharva-sachan-975848252/">
                <FaInstagram/>
            </a>
            <a href="https://www.linkedin.com/in/atharva-sachan-975848252/">
                <FaX/>
            </a>


        </div>


    </div>
  )
}

export default FollowOn