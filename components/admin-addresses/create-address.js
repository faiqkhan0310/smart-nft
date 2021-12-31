import React, { useEffect } from "react";
import useForm from "../../hooks/useForm";
import { useRouter } from "next/router";

const AdminAddressCreate = () => {
  const { handleChange, form, setForm } = useForm("");
  const router = useRouter();

  //  create Admin

  const createAdmin = async (e) => {
    e.preventDefault();
    const body = {
      PublicAddress: form.adminAddress,
    };
    const res = await fetch(`${process.env.BASE_URl}/api/admin/adminaddress`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (res.status == 200 || res.status == 201) {
      router.push("/adminaddress");
    }
  };

  return (
    <div className="container-fluid">
      <div className="col-12 col-md-12">
        <div className="app-card app-card-settings shadow-sm p-4">
          <div className="app-card-body">
            <form className="settings-form" onSubmit={createAdmin}>
              <div className="mb-3">
                <label htmlFor="setting-input-2" className="form-label">
                  Admin Address
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="adminAddress"
                  name="adminAddress"
                  value={form.adminAddress}
                  onChange={handleChange}
                  placeholder="Enter address"
                />
              </div>

              <button type="submit" className="btn app-btn-primary">
                Save Changes
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAddressCreate;
