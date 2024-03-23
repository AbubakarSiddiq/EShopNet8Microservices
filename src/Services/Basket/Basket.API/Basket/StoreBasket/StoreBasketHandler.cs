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

public class StoreBasketCommandHandler(IBasketRepository repository)
    : ICommandHandler<StoreBasketCommand, StoreBasketResult>
{
    public async Task<StoreBasketResult> Handle(StoreBasketCommand command, CancellationToken cancellationToken)
    {
        var cart = command.Cart;
        await repository.StoreBasket(cart, cancellationToken);

        return new StoreBasketResult(cart.UserName);
    }
}
