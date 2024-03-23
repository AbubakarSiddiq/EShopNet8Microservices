namespace Basket.API.Basket.StoreBasket;

public record StoreBasketCommand(ShoppingCart Cart) : ICommand<StoreBasketResult>;

public record StoreBasketResult(string UserName);

public class StoreBasketValidator : AbstractValidator<StoreBasketCommand>
{
    public StoreBasketValidator()
    {
        RuleFor(command => command.Cart).NotNull().WithMessage("Cart can not be null.");
        RuleFor(command => command.Cart.UserName).NotNull().WithMessage("UserName is required.");
    }
}

public class StoreBasketCommandHandler(IBasketRepository repository, DiscountProtoService.DiscountProtoServiceClient discountClient)
    : ICommandHandler<StoreBasketCommand, StoreBasketResult>
{
    public async Task<StoreBasketResult> Handle(StoreBasketCommand command, CancellationToken cancellationToken)
    {
        var cart = command.Cart;
        await DeductDiscount(cart, cancellationToken);

        await repository.StoreBasket(cart, cancellationToken);

        return new StoreBasketResult(cart.UserName);
    }

    private async Task DeductDiscount(ShoppingCart cart, CancellationToken cancellationToken)
    {
        foreach (var item in cart.Items)
        {
            var coupon = await discountClient.GetDiscountAsync(new GetDiscountRequest { ProductName = item.ProductName }, cancellationToken: cancellationToken);
            item.Price -= coupon.Amount;
        }
    }
}
