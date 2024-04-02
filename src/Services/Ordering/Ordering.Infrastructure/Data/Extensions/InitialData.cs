namespace Ordering.Infrastructure.Data.Extensions;

internal class InitialData
{
    public static IEnumerable<Customer> Customers =>
    new List<Customer>
    {
        Customer.Create(CustomerId.Of(new Guid("58c49479-ec65-4de2-86e7-033c546291aa")), "ali", "ali@gmail.com"),
        Customer.Create(CustomerId.Of(new Guid("189dc8dc-990f-48e0-a37b-e6f2b60b9d7d")), "john", "john@gmail.com")
    };

    public static IEnumerable<Product> Products =>
        new List<Product>
        {
            Product.Create(ProductId.Of(new Guid("5334C996-8457-4CF0-815C-ED2B77C4FF61")), "Cabbage", 10),
            Product.Create(ProductId.Of(new Guid("C67D6323-E8B1-4BDF-9A75-B0D0D2E7E914")), "Tomato", 12),
            Product.Create(ProductId.Of(new Guid("4F136E9F-FF8C-4C1F-9A33-D12F689BDAB8")), "Brinjal", 16),
            Product.Create(ProductId.Of(new Guid("6EC1297B-EC0A-4AA1-BE25-6726E3B51A27")), "Beetroot", 8)
        };

    public static IEnumerable<Order> OrdersWithItems
    {
        get
        {
            var address1 = Address.Of("ali", "ahmad", "ali@gmail.com", "Bahcelievler No:4", "Turkey", "Istanbul", "38050");
            var address2 = Address.Of("john", "doe", "john@gmail.com", "Broadway No:1", "England", "Nottingham", "08050");

            var payment1 = Payment.Of("ali", "5555555555554444", "12/28", "355", 1);
            var payment2 = Payment.Of("john", "8885555555554444", "06/30", "222", 2);

            var order1 = Order.Create(
                            OrderId.Of(Guid.NewGuid()),
                            CustomerId.Of(new Guid("58c49479-ec65-4de2-86e7-033c546291aa")),
                            OrderName.Of("ORD_1"),
                            shippingAddress: address1,
                            billingAddress: address1,
                            payment1);
            order1.Add(ProductId.Of(new Guid("C67D6323-E8B1-4BDF-9A75-B0D0D2E7E914")), 2, 12);
            order1.Add(ProductId.Of(new Guid("4F136E9F-FF8C-4C1F-9A33-D12F689BDAB8")), 1, 16);

            var order2 = Order.Create(
                            OrderId.Of(Guid.NewGuid()),
                            CustomerId.Of(new Guid("189dc8dc-990f-48e0-a37b-e6f2b60b9d7d")),
                            OrderName.Of("ORD_2"),
                            shippingAddress: address2,
                            billingAddress: address2,
                            payment2);
            order2.Add(ProductId.Of(new Guid("4F136E9F-FF8C-4C1F-9A33-D12F689BDAB8")), 1, 16);
            order2.Add(ProductId.Of(new Guid("C67D6323-E8B1-4BDF-9A75-B0D0D2E7E914")), 2, 12);

            return new List<Order> { order1, order2 };
        }
    }
}
