export const processFamilyData = (family: any, campusId: number) => {
  const processedFamily = { ...family, campusId };
  const children = family.children.map((child: any) => ({
    ...child,
    familyId: family.id,
    campusId,
  }));
  return { processedFamily, children };
};

export const processClassData = (cls: any, campusId: number) => ({
  ...cls,
  campusId,
});

export const processRegistrationData = (
  registration: any,
  campusId: number
) => ({
  ...registration,
  campusId,
});
