export function getLocationWithSpecializations(singleLocation) {
  const location = {
    locationId: singleLocation[0].locationId,
    locationName: singleLocation[0].locationName,
    postalCode: singleLocation[0].postalCode,
    street: singleLocation[0].street,
    website: singleLocation[0].website,
    specializations: singleLocation.map((single) => {
      return {
        specializationId: single.specializationId,
        specializationName: single.specializationName,
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
