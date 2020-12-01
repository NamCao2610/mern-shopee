import React from 'react'
import { Link } from 'react-router-dom';

function Copyright() {
    return (
        <div className="copyright text-center bg-dark text-white py-2">
            <p className="font-rale font-size-14">&copy; Copyrights 2020. Designed by <Link href="#" className="color-danger">Nam
                Cao</Link>
            </p>
        </div>
    )
}

export default Copyright
