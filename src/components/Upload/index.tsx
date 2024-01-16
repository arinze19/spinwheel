import { useMemo } from 'react';
import axios from 'axios';
import { useMutation } from 'react-query';

import { FiImage } from 'react-icons/fi';

import { cloudinary } from '../../constants';

import styled from 'styled-components';

// types
export interface UploadProps {
  imageUrl: string;
  onUpload: (value: string) => void;
}

const Upload = ({ imageUrl, onUpload }: UploadProps) => {
  const CloudinaryMutation = useMutation(async (file: FormData) => {
    const { data } = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudinary.name}/image/upload`,
      file,
      {
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    return data;
  });

  const Actions = useMemo(() => {
    return {
      upload: (e: React.FormEvent<HTMLInputElement>) => {
        if (!e.currentTarget.files) return;

        const file = e.currentTarget.files[0];

        const fd = new FormData();
        fd.append('upload_preset', cloudinary.preset);
        fd.append('tags', 'browser_upload');
        fd.append('file', file);
        fd.append('folder', cloudinary.name);
        fd.append('public_id', `${Date.now()}`);

        CloudinaryMutation.mutate(fd, {
          onSuccess: (data) => {
            onUpload(data.secure_url);
          },
        });
      },
    };
  }, []);

  return (
    <Sty.Container htmlFor='images' disabled={CloudinaryMutation.isLoading}>
      {!imageUrl && <FiImage size={20} />}

      {imageUrl && (
        <Sty.Image
          src={imageUrl}
          alt='uploaded image'
          onClick={() => onUpload('')}
        />
      )}

      <input
        type='file'
        name='images'
        id='images'
        accept='.png,.jpeg'
        onChange={Actions.upload}
      />
    </Sty.Container>
  );
};

// Styled
const Sty = {
  Container: styled.label<{ disabled: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 10px;
    cursor: pointer;

    input {
      display: none;
    }

    // if disabled
    ${({ disabled }) =>
      disabled &&
      `
      color: #ccc;
      cursor: not-allowed;
    `}
  `,
  Image: styled.img`
    width: 20px;
    height: 20px;
    border-radius: 4px;
    cursor: pointer;
  `,
};

export default Upload;
