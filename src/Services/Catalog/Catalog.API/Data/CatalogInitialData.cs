namespace Catalog.API.Data;

public class CatalogInitialData : IInitialData
{
    public async Task Populate(IDocumentStore store, CancellationToken cancellation)
    {
        using var session = store.LightweightSession();

        if (await session.Query<Product>().AnyAsync())
            return;

        session.Store<Product>(GetPreconfiguredProducts());
        await session.SaveChangesAsync();
    }

    private static IEnumerable<Product> GetPreconfiguredProducts() => new List<Product>()
            {
                new Product()
                {
                    Id = new Guid("5334C996-8457-4CF0-815C-ED2B77C4FF61"),
                    Name = "Cabbage",
                    Description = "",
                    ImageFile = "cabbage.jpg",
                    Price = 10.00M,
                    Category = ["Vegetable"]
                },
                new Product()
                {
                    Id = new Guid("C67D6323-E8B1-4BDF-9A75-B0D0D2E7E914"),
                    Name = "Tomato",
                    Description = "",
                    ImageFile = "tomato.png",
                    Price = 12.00M,
                    Category = ["Vegetable"]
                },
                new Product()
                {
                    Id = new Guid("4F136E9F-FF8C-4C1F-9A33-D12F689BDAB8"),
                    Name = "Brinjal",
                    Description = "",
                    ImageFile = "brinjal.jpg",
                    Price = 20.00M,
                    Category = ["Vegetable"]
                },
                new Product()
                {
                    Id = new Guid("6EC1297B-EC0A-4AA1-BE25-6726E3B51A27"),
                    Name = "Beetroot",
                    Description = "",
                    ImageFile = "beetroot.jpg",
                    Price = 8.00M,
                    Category = ["Vegetable"]
                },
                new Product()
                {
                    Id = new Guid("419642D0-4331-4873-9B7F-10699260C9CA"),
                    Name = "Onion",
                    Description = "",
                    ImageFile = "onion.jpg",
                    Price = 10.00M,
                    Category = ["Vegetable"]
                },
                new Product()
                {
                    Id = new Guid("75C70080-EDA8-425B-BCDA-889029A1E91B"),
                    Name = "Ginger",
                    Description = "",
                    ImageFile = "ginger.jpg",
                    Price = 8.00M,
                    Category = ["Vegetable"]
                }
            };

}
