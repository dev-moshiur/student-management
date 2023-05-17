import React from "react";
import ClearIcon from "@mui/icons-material/Clear";
import "./update.scss";

export default function Update({
  inputs,
  header,
  handleSubmit,
  setShowUpdateForm,
}) {



  return (
    <div className="updateComponent">
      <form
        className="wrapper"
        onSubmit={handleSubmit}
        enctype="multipart/form-data"
      >
        <div className="heading">{header}</div>
        <div className="container">
          {inputs.map((elm) => (
            <div className="row">
             <label htmlFor="">{elm.label || elm.name }</label>
              {elm.field == "input" && (
                <input
                  defaultValue={elm.defaultValue && elm.defaultValue}
                  list={elm.name}
                  type={elm.type == 'file' ? 'file' :elm.type == 'date' ? 'date':'text'}
                  name={elm.name}
                />
              )}
              {elm.field == "textarea" && (
                <textarea
                  defaultValue={elm.defaultValue && elm.defaultValue}
                  list={elm.name}
                  type={'text'}
                  name={elm.name}
                />
              )}
              {elm.datalist && (
                <datalist id={elm.name}>
                  {elm.datalist.map((item) => (
                    <option value={item}></option>
                  ))}
                </datalist>
              )}
            </div>
          ))}
        </div>
        <div className="submit ">
          <input className="btn m" type="submit" value="Update" />
        </div>
      </form>
      <div className="clear" onClick={() => setShowUpdateForm(false)}>
        <ClearIcon />
      </div>
    </div>
  );
}
