class Form {
    constructor({
                    id,
                    name,
                    lastName,
                    dni,
                    birthYear,
                    address,
                    address2,
                    postalCode,
                    civilStatus,
                    phoneNumber,
                    email,
                    password,
                    familyMembers,
                    children,
                    numberOfChildren = 0,
                    futureChildren = 0,
                    occupation,
                    workHours,
                    vacations,
                    houseType,
                    houseOwner,
                    housePermission = 'no',
                    yard,
                    fence='no',
                    petType,
                    reason,
                    previousPets,
                    previousPetsDetails = '',
                    currentPets = 0,
                    currentPetDetails,
                    petsNeutered = 0,
                    petsVaccinated = 'no',
                    financialAbility,
                    additionalInfo,
                    estadoValidacionFormulario = 'pending',
                    estadoValidacionPago = 'pending',
                    role = 'client',
                    urlPayment = '',
                }) {
        this.id = id;
        this.name = name;
        this.lastName = lastName;
        this.dni = dni;
        this.birthYear = birthYear;
        this.address = address;
        this.address2 = address2;
        this.postalCode = postalCode;
        this.civilStatus = civilStatus;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.password = password;
        this.familyMembers = familyMembers;
        this.children = children;
        this.numberOfChildren = numberOfChildren;
        this.futureChildren = futureChildren;
        this.occupation = occupation;
        this.workHours = workHours;
        this.vacations = vacations;
        this.houseType = houseType;
        this.houseOwner = houseOwner;
        this.housePermission = housePermission;
        this.yard = yard;
        this.fence = fence;
        this.petType = petType;
        this.reason = reason;
        this.previousPets = previousPets;
        this.previousPetsDetails = previousPetsDetails;
        this.currentPets = currentPets;
        this.currentPetDetails = currentPetDetails;
        this.petsNeutered = petsNeutered;
        this.petsVaccinated = petsVaccinated;
        this.financialAbility = financialAbility;
        this.additionalInfo = additionalInfo;
        this.estadoValidacionFormulario = estadoValidacionFormulario;
        this.estadoValidacionPago = estadoValidacionPago;
        this.role = role;
    }
}

module.exports = Form;
