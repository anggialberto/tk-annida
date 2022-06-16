import React from 'react';
import Select from 'react-select';
import { useForm, Controller } from "react-hook-form";
import Card from '~components/Card/Card';
import FormInputWrapper from '~components/Form/FormInputWrapper/FormInputWrapper';
import FormLabel from '~components/Form/FormLabel/FormLabel';
import FormTextError from '~components/Form/FormTextError/FormTextError';
import FormWrapper from '~components/Form/FormWrapper/FormWrapper';
import Input from '~components/Form/Input/Input';
import PDBBWrapper from '~components/Wrapper/PDDB/PPDBBWrapper';


const PPDBPage = () => {
  const { control, trigger, handleSubmit, formState: { errors } } = useForm({
    mode: 'all',
    shouldFocusError: true,
    defaultValues: {
      fullName: '',
      gender: '',
    }
  });


  const onSubmit = data => console.log('onSubmit', data);

  return (
    <PDBBWrapper>
      <Card
        title={'Selamat Datang di PDBB TK Annida'}
        description={'Apabila anda telah melakukan pendaftaran, silahkan klik tombol "Cek Status Pendaftaran"'}
      >
        <button className={'btn btn--purple'}>Cek Status Pendaftaran</button>
      </Card>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Card
          title={'Data Diri Calon Pendaftar'}
        >
          <FormWrapper>
            <FormLabel>
              Nama Lengkap
            </FormLabel>
            <FormInputWrapper>
              <Controller
                name="fullName"
                control={control}
                rules={{ required: true }}
                render={({ field }) => <Input placeholder={'Nama Lengkap'} error={!!errors.fullName} {...field} />}
              />
              {errors?.fullName?.type === 'required' && <FormTextError>Nama Lengkap Wajib diisi</FormTextError>}
            </FormInputWrapper>
          </FormWrapper>

          <FormWrapper>
            <FormLabel>
              Jenis Kelamin
            </FormLabel>
            <FormInputWrapper>
              <Controller
                name="gender"
                control={control}
                rules={{ required: true }}
                render={({ field }) => <Select
                  {...field}
                  options={[
                    { value: "laki-laki", label: "Laki-Laki" },
                    { value: "perempuan", label: "Perempuan" },
                  ]}
                />}
              />
              {errors?.gender?.type === 'required' && <FormTextError>Nama Lengkap Wajib diisi</FormTextError>}
            </FormInputWrapper>
          </FormWrapper>
        </Card>
        <button type='button' onClick={() => trigger()}>SUBMIT</button>
      </form>


    </PDBBWrapper>
  )
}

export default PPDBPage;