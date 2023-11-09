import React from "react";

type LoadingType = {
    loading: boolean
}

const LaptopMask = ({ loading }: LoadingType) => {

    return(
        <div>
        {
            loading && <p>Loading</p>
        }
        </div>

    )

}

export default LaptopMask