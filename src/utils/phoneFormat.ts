export default (str: string) => {
  return str.split('').reduce((result, n) => {
    return result.replace('X', n);
  }, '+XXX(XX) XXX-XX-XX');
};

