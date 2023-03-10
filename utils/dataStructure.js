export function LocationWithSpecializations(locationWithSpecializations) {
  const location = {
    locationId: locationWithSpecializations[0].locationId,
    name: locationWithSpecializations[0].name,
    postalCode: locationWithSpecializations[0].postalCode,
    street: locationWithSpecializations[0].street,
    website: locationWithSpecializations[0].website,
    specializations: locationWithSpecializations.map(() => {
      return {
        specializationId: locationWithSpecializations.specializationId,
        specializationName: locationWithSpecializations.specializationName,
      };
    }),
  };
  return location;
}

export function transformMultipleLocations(locations) {
  const locationsTransformed = locations.map((location) => {
    return {
      locationId: location.locationId,
      name: location.name,
      postalCode: location.postalCode,
      street: location.street,
      website: location.website,
      specializations: [
        {
          specializationId: location.specializationId,
          specializationName: location.specializationName,
        },
      ],
    };
  });
  return locationsTransformed;
}

export function mergeDuplicateLocations(locations) {
  const locationsMerged = [
    ...locations
      .reduce((r, location) => {
        const record = r.get(location.locationId) || {};
        r.set(location.locationId, {
          locationId: location.locationId,
          name: location.name,
          postalCode: location.postalCode,
          street: location.street,
          website: location.website,
          specializations: [
            ...(record.specializations || []),
            ...location.specializations.filter(
              (object) => Object.keys(object).length !== 0,
            ),
          ],
        });
        return r;
      }, new Map())
      .values(),
  ];
  return locationsMerged;
}

export function transformDataForSelect(specializationsFromDatabase) {
  const specializations = specializationsFromDatabase.map((specialization) => {
    return {
      value: specialization.id,
      label: specialization.name,
    };
  });
  return specializations;
}
