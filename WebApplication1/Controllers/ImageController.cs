using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using WebApplication1.Model;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImageController : ControllerBase
    {
        private readonly IHostingEnvironment hostingEnvironment;
        private readonly string path = "Image";

        public ImageController(IHostingEnvironment hostingEnvironment)
        {
            this.hostingEnvironment = hostingEnvironment;
        }

        [HttpGet]
        public async Task<IEnumerable<ImageModel>> Get()
        {
            List<ImageModel> images = new List<ImageModel>();
            var imagePath = Path.Combine(hostingEnvironment.ContentRootPath, path);
            DirectoryInfo directory = new DirectoryInfo(imagePath);
            FileInfo[] Files = directory.GetFiles();
            var fullNameImg = Files.Select(x => x.FullName).ToList();
            foreach (var name in fullNameImg)
            {
                byte[] bytes = await System.IO.File.ReadAllBytesAsync(name);
                DirectoryInfo imageInfo = new DirectoryInfo(name);
                images.Add(new ImageModel
                {
                    Name = Path.GetFileName(name),
                    Data = Convert.ToBase64String(bytes, 0, bytes.Length),
                    Date = imageInfo.CreationTime.Date
                });
            }

            var imgOderbyDateDesc = images.OrderByDescending(x => x.Date);
           return imgOderbyDateDesc;
        }
    }
}