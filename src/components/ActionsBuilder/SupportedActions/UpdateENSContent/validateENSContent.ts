import { ENSContentForm } from './types';
import { isEnsName, isIpfsHash } from 'utils/validations';

const validateENSContent = (values: ENSContentForm) => {
  const { ensName, ipfsHash } = values;

  const errors = {
    ensName: null,
    ipfsHash: null,
  };

  const ensValidation = isEnsName(ensName);
  const ipfsValidation = isIpfsHash(ipfsHash);

  errors.ensName = ensValidation.validationError;
  errors.ipfsHash = ipfsValidation.validationError;

  return {
    errors: Object.entries(errors).reduce((acc, [key, value]) => {
      return {
        ...acc,
        ...(!!value && { [key]: value }), // remove keys that has no error value
      };
    }, {}),
    values,
  };
};

export default validateENSContent;
