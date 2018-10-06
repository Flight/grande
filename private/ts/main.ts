interface OrderFormField {
    id: string;
    name: string;
}

interface OrderFormModel {
    id: string;
    name: string;
    metals: Array<OrderFormField>;
    sides: Array<OrderFormField>;
    price: string;
}

interface OrderFormData {
    models: Array<OrderFormModel>;
}

const orderFormInit = (): void => {
    const orderFormModels: Array<OrderFormModel> = JSON.parse($('#order-form-json').html()).models;
    const orderFormTemplateElement = $('#order-form-template');
    const orderFormTemplate: any = $($.parseHTML(orderFormTemplateElement.html()));
    const orderFormModel = $('#order-form-model');
    const orderFormModelArray = [];

    orderFormModels.forEach((model: OrderFormModel) => {
        orderFormModelArray.push(`<option value="${model.id}">${model.name}</option>`);
    });

    orderFormModel.html(orderFormModelArray.join(''));

    orderFormModel.on('change', (event: JQuery.Event) => {
        const modelId = $(event.currentTarget).val();
        const currentModel = orderFormModels.find((model: OrderFormModel) => model.id === modelId);
        const orderFormMetalArray = [];
        const orderFormSideArray = [];

        currentModel.metals.forEach((model: OrderFormModel) => {
            orderFormMetalArray.push(`<option value="${model.id}">${model.name}</option>`);
        });
        orderFormTemplate.find('#order-form-metal').html(orderFormMetalArray.join(''));

        currentModel.sides.forEach((model: OrderFormModel) => {
            orderFormSideArray.push(`<option value="${model.id}">${model.name}</option>`);
        });
        orderFormTemplate.find('#order-form-side').html(orderFormSideArray.join(''));

        orderFormTemplate.find('#order-form-price').html(currentModel.price);

        $('#order-form-template').replaceWith(orderFormTemplate);

        $('.order-gallery').attr('hidden', 'hidden');
        $('#order-gallery-' + modelId).removeAttr('hidden');
    }).change();
};

$((): void => {
    orderFormInit();
});
