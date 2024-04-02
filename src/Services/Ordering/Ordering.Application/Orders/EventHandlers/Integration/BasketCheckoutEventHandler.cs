using BuildingBlocks.Messaging.Events;
using MassTransit;
using Ordering.Application.Orders.Commands.CreateOrder;
using Ordering.Domain.ValueObjects;

namespace Ordering.Application.Orders.EventHandlers.Integration;

public class BasketCheckoutEventHandler(ISender sender, ILogger<BasketCheckoutEventHandler> logger)
    : IConsumer<BasketCheckoutEvent>
{
    public async Task Consume(ConsumeContext<BasketCheckoutEvent> context)
    {
        logger.LogInformation("Integration Event handled: {IntegrationEvent}", context.Message.GetType().Name);
        var command = MapToCreateOrderCommand(context.Message);
        await sender.Send(command);
    }

    private CreateOrderCommand MapToCreateOrderCommand(BasketCheckoutEvent message)
    {
        // Create full order with incoming event data
        var addressDto = new AddressDto(message.FirstName, message.LastName, message.EmailAddress, message.AddressLine, message.Country, message.State, message.ZipCode);
        var paymentDto = new PaymentDto(message.CardName, message.CardNumber, message.Expiration, message.CVV, message.PaymentMethod);
        var orderId = Guid.NewGuid();

        var orderDto = new OrderDto(
            Id: orderId,
            CustomerId: new Guid("58c49479-ec65-4de2-86e7-033c546291aa"), // new guid value as customer id.
            OrderName: message.UserName,
            ShippingAddress: addressDto,
            BillingAddress: addressDto,
            Payment: paymentDto,
            Status: Ordering.Domain.Enums.OrderStatus.Pending,
            OrderItems:
            [
                // order items should come from basket checkout event message.
                //new OrderItemDto(orderId, new Guid("4f136e9f-ff8c-4c1f-9a33-d12f689bdab8"), 2, 16),
                //new OrderItemDto(orderId, new Guid("99653F5C-9072-4FBD-A282-533E78BD096C"), 1, 12)
                
                // right
                //new OrderItemDto(orderId, new Guid("6ec1297b-ec0a-4aa1-be25-6726e3b51a27"), 1, 12)
                new OrderItemDto(orderId, new Guid("C67D6323-E8B1-4BDF-9A75-B0D0D2E7E914"), 1, 12)
            ]);

        return new CreateOrderCommand(orderDto);
    }
}
