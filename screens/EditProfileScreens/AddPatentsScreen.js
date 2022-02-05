import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import {
  AppForm,
  AppFormCardInput,
  ErrorMessage,
  SubmitButton,
} from "../../components/forms";
import AppPicker from "../../components/AppPicker";
import candidateApi from "../../api/candidate";
import locationApi from "../../api/location";
import DatePicker from "../../components/DatePicker";
import { formattedDate, formattedNumericDate } from "../../utilities/date";
import useApi from "../../hooks/useApi";

const issueStatus = [
  { _id: 1, name: "Issued" },
  { _id: 2, name: "Pending" },
];

function AddPatentsScreen({ data, index }) {
  const navigation = useNavigation();

  const {
    data: countries,
    loading: countriesLoading,
    request: loadCountries,
  } = useApi(locationApi.getCountries);

  useEffect(async () => {
    loadCountries();
  }, []);

  if (index >= 0) {
    var {
      issue_date,
      description,
      title,
      link,
      patent_office,
      patent_no,
      status: prevStatus,
    } = data.patents[index];
  }

  const [date, setDate] = useState(
    issue_date ? formattedDate(issue_date) : null
  );
  const [dateError, setDateError] = useState(false);
  const [status, setStatus] = useState(prevStatus ? prevStatus : "");
  const [patentOffice, setPatentOffice] = useState(
    patent_office ? patent_office : ""
  );

  const { request: updateProfile } = useApi(candidateApi.updateProfile);

  const handleAddSubmit = (values) => {
    const val = {
      ...values,
      issue_date: date,
      status,
      patent_office: patentOffice,
    };

    const patents = [...data.patents, val];

    updateProfile(data.id, { patents });
    navigation.goBack();
  };

  const handleEditSubmit = (values) => {
    const val = {
      ...values,
      issue_date: date,
      status,
      patent_office: patentOffice,
    };

    const patents = data.patents;
    patents.splice(index, 1, val);

    updateProfile(data.id, { patents });
    navigation.goBack();
  };

  return (
    <ScrollView
      contentContainerStyle={{ padding: 15 }}
      style={styles.container}
    >
      <AppForm
        initialValues={{
          title: title ? title : "",
          link: link ? link : "",
          description: description ? description : "",
          patent_no: patent_no ? patent_no : "",
        }}
        onSubmit={index >= 0 ? handleEditSubmit : handleAddSubmit}
      >
        <AppFormCardInput
          name="title"
          defaultValue={title ? title : ""}
          label="Patent Title"
          placeholder="xyz"
        />
        <AppPicker
          name="patent_office"
          defaultValue={patent_office ? patent_office : ""}
          label="Patent Office"
          selectedItem={patentOffice}
          onSelectItem={(item) => {
            setPatentOffice(item.name);
          }}
          title={patentOffice ? patentOffice : ""}
          items={countries}
          loading={countriesLoading}
        />
        <AppFormCardInput
          name="patent_no"
          defaultValue={patent_no ? patent_no : ""}
          label="Patent No. / Application No."
          placeholder="xyz"
        />
        <AppPicker
          label="Patent Status"
          title={status ? status : "Select"}
          items={issueStatus}
          onSelectItem={(item) => setStatus(item.name)}
        />
        <DatePicker
          label="Issue Date"
          initialDate={date}
          minDate={null}
          onDateChange={(date, timestamp) => {
            setDate(timestamp);
          }}
          value={date ? formattedNumericDate(date) : null}
        />
        <AppFormCardInput
          name="link"
          defaultValue={link ? link : ""}
          label="Patent URL"
          placeholder="Paste URL here"
        />
        <AppFormCardInput
          name="description"
          defaultValue={description ? description : ""}
          label="Description"
          numberOfLines={6}
          multiline
          placeholder="Describe your project here..."
        />
        <SubmitButton title="Add" />
      </AppForm>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default AddPatentsScreen;
