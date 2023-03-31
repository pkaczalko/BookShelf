import React from "react";
import {OverlayTrigger, Tooltip, Button} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css';

export default function Category(){
    const [hover, setHover] = React.useState({backgroundColor: "#E8E8E8", borderWidth: "0px", boxShadow:"none"})

    const tooltipStyle = { color: 'black', backgroundColor: 'transparent', border: 0 };
    const buttonStyle = {fontSize:"29px", width:"200px", backgroundColor: hover.backgroundColor, borderWidth: hover.borderWidth, boxShadow: hover.boxShadow}

    return(
        <OverlayTrigger placement="right" overlay={({placement: _placement, arrowProps: _arrowProps, 
            show: _show, popper: _popper,hasDoneInitialMeasure: _hasDoneInitialMeasure,...props}) => (
            <div {...props}
              style={{
                position: 'absolute',
                backgroundColor: '#E8E8E8',
                padding: '2px 10px',
                color: 'black',
                borderRadius: 3,
                // transition: "width 3s,opacity 1s,transform .75s",
                ...props.style,
              }}
            >
              Simple tooltip
            </div>
          )}
          >
            <Button onMouseEnter={() => setHover({backgroundColor: "#E8E8E8", borderWidth:"0px", boxShadow:"none"})} style={buttonStyle} variant="light" className="d-inline-flex align-items-center">
                <span className="ms-1">Hover to see</span>
            </Button>
        </OverlayTrigger>
    )
}