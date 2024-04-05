import { useState } from "preact/hooks";

export default function EditContactForm(
  data: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    gender: string;
  },
) {
  const [formData, setFormData] = useState({
    name: {
      field: "name",
      value: data.first_name,
      error: "",
    },
    lastName: {
      field: "lastName",
      value: data.last_name,
      error: "",
    },
    email: {
      field: "email",
      value: data.email,
      error: "",
    },
    gender: {
      field: "gender",
      value: data.gender,
      error: "",
    },
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  let isValid = true;
  function validateForm() {
    
    const newFormData = { ...formData };
    if (!newFormData.name.value) {
      newFormData.name.error = "Name is required";
      isValid = false;
    }
    if (!newFormData.lastName.value) {
      newFormData.lastName.error = "Last Name is required";
      isValid = false;
    }
    if (!newFormData.email.value) {
      newFormData.email.error = "Email is required";
      isValid = false;
    }
    if (!newFormData.gender.value) {
      newFormData.gender.error = "Gender is required";
    }

    const emailRegex = /^[^\s]+@+[^\s]+\.[^\s]+$/;
    if (!emailRegex.test(newFormData.email.value)) {
      newFormData.email.error = "Invalid email";
      isValid = false;
    }


      setFormData(newFormData);

  }

  function handleSubmit(e: any) {
    e.preventDefault();
    validateForm();
    if (!isValid) return;
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formData.name.value,
        lastName: formData.lastName.value,
        email: formData.email.value,
        gender: formData.gender.value,
      }),
    };
  
    fetch(`/api/contact?id=${data.id}`, options)
      .then((response) => {
        setIsSubmitting(false);
        if (response.ok) {
          alert("Contact updated successfully");
        } else {
          alert("Failed to update contact");
        }
      });
  }
  

  return (
    <form onSubmit={handleSubmit}>
      <div class={"flex flex-row space w-full"}>
        <div class={"flex flex-col w-full"}>
          <label for="name">Name</label>
          <input
            class={"w-full"}
            type="text"
            id="name"
            name="name"
            value={formData.name.value}
            onChange={(e) =>
              setFormData({
                ...formData,
                name: { ...formData.name, value: e.currentTarget.value },
              })}
          />
          {formData.name.error && (
            <p class={"text-red-500"}>{formData.name.error}</p>
          )}
        </div>
        <div class={"flex flex-col w-full"}>
          <label for="lastName">Last Name</label>
          <input
            class={"w-full"}
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName.value}
            onChange={(e) =>
              setFormData({
                ...formData,
                lastName: {
                  ...formData.lastName,
                  value: e.currentTarget.value,
                },
              })}
          />
          {formData.lastName.error && (
            <p class={"text-red-500"}>{formData.lastName.error}</p>
          )}
        </div>
      </div>
      <label for="email">Email</label>
      <input
        class={"w-full"}
        type="text"
        id="email"
        name="email"
        value={formData.email.value}
        onChange={(e) =>
          setFormData({
            ...formData,
            email: { ...formData.email, value: e.currentTarget.value },
          })}
      />
      {formData.email.error && (
        <p class={"text-red-500"}>{formData.email.error}</p>
      )}
      <label for="gender">Gender</label>
      <select
        class={"w-full"}
        id="gender"
        name="gender"
        value={formData.gender.value}
        onChange={(e) =>
          setFormData({
            ...formData,
            gender: { ...formData.gender, value: e.currentTarget.value },
          })}
      >
        <option value={""}>
          Select a gender
        </option>
        <option value={"Male"}>
          Male
        </option>
        <option value={"Female"}>
          Female
        </option>
        <option value={"none"}>
          I prefer not to answer
        </option>
        <option value={"Genderqueer"}>
          Genderqueer
        </option>
        <option value={"Other"}>
          Other
        </option>
      </select>
      {formData.gender.error && (
        <p class={"text-red-500"}>{formData.gender.error}</p>
      )}
      <button class={"w-full"} type="submit">
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}