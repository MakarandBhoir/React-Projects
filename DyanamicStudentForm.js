import React, { useState } from "react";

function DynamicStudentForm() {
    const [form, setForm] = useState([]);
    const prevIsValid = () => {
        if (form.length === 0) {
            return true;
        }

        const someEmpty = form.some(
            (item) => item.studentName === "" || item.studentId === "" || item.studentScore === ""
        );

        if (someEmpty) {
            form.map((item, index) => {
                const allPrev = [...form];

                if (form[index].studentId === "") {
                    allPrev[index].errors.studentId = "StudentId is required";
                }

                if (form[index].studentName === "") {
                    allPrev[index].errors.studentName = "StudentName is required";
                }

                if (form[index].studentScore === "") {
                    allPrev[index].errors.studentScore = "StudentScore is required";
                }
                setForm(allPrev);
            });
        }

        return !someEmpty;
    };

    const handleAddStudent = (e) => {
        e.preventDefault();
        const inputState = {
            studentId: "",
            studentName: "",
            studentScore: "",

            errors: {

            },
        };

        if (prevIsValid()) {
            setForm((prev) => [...prev, inputState]);
        }
    };

    const onChange = (index, event) => {
        event.preventDefault();
        event.persist();

        setForm((prev) => {
            return prev.map((item, i) => {
                if (i !== index) {
                    return item;
                }

                return {
                    ...item,
                    [event.target.name]: event.target.value,

                    errors: {
                        ...item.errors,
                        [event.target.name]:
                            event.target.value.length > 0
                                ? null
                                : [event.target.name] + " Is required",
                    },
                };
            });
        });
    };

    const handleRemoveField = (e, index) => {
        e.preventDefault();

        setForm((prev) => prev.filter((item) => item !== prev[index]));
    };

    const handleSubmitStudent = (e) => {
        e.preventDefault();
        alert(JSON.stringify(form))
    }
    return (
        <div className="container mt-5 py-5">
            <h1>Student Form</h1>
            <p>Student registration dynamic form</p>

            {/* {JSON.stringify(form)} */}

            <form>
                {form.map((item, index) => (
                    <div className="row mt-3" key={`item-${index}`}>
                        <div className="col">
                            <input
                                type="text"
                                className={
                                    item.errors.studentId
                                        ? "form-control  is-invalid"
                                        : "form-control"
                                }
                                name="studentId"
                                placeholder="studentId"
                                value={item.studentId}
                                onChange={(e) => onChange(index, e)}
                            />

                            {item.errors.studentId && (
                                <div className="invalid-feedback">{item.errors.studentId}</div>
                            )}
                        </div>

                        <div className="col">
                            <input
                                type="text"
                                className={
                                    item.errors.studentName
                                        ? "form-control  is-invalid"
                                        : "form-control"
                                }
                                name="studentName"
                                placeholder="StudentName"
                                value={item.studentName}
                                onChange={(e) => onChange(index, e)}
                            />

                            {item.errors.studentName && (
                                <div className="invalid-feedback">{item.errors.studentName}</div>
                            )}
                        </div>

                        <div className="col">
                            <input
                                type="text"
                                className={
                                    item.errors.studentScore
                                        ? "form-control  is-invalid"
                                        : "form-control"
                                }
                                name="studentScore"
                                placeholder="StudentScore"
                                value={item.studentScore}
                                onChange={(e) => onChange(index, e)}
                            />

                            {item.errors.studentScore && (
                                <div className="invalid-feedback">{item.errors.studentScore}</div>
                            )}
                        </div>

                        <button
                            className="btn btn-danger"
                            onClick={(e) => handleRemoveField(e, index)}
                        >
                            X
                        </button>
                    </div>
                ))}

                <button className="btn btn-primary mt-2" onClick={handleAddStudent}>
                    Add Student
                </button>
                <button className="btn btn-primary mt-2 ml-2" onClick={handleSubmitStudent}
                    disabled={form.length == 0 ? true : false}
                >
                    Submit Form
                </button>

            </form>
        </div>
    );
}
export default DynamicStudentForm;