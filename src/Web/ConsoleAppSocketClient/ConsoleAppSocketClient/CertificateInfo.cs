using System;
using System.Runtime.ConstrainedExecution;
using System.Security.Cryptography.X509Certificates;

public class CertificateInfo
{
    public void GetCertificateThumbprint(string certificateNameOrThumbprint)
    {
        using (var store = new X509Store(StoreName.My, StoreLocation.LocalMachine)) // Или LocalMachine
        {
            store.Open(OpenFlags.ReadOnly);

            X509Certificate2Collection certificates = null;

            // Попробуем найти по отпечатку, если переданный параметр выглядит как отпечаток
            if (certificateNameOrThumbprint.Length >= 20) // Примерная длина отпечатка
            {
                certificates = store.Certificates.Find(X509FindType.FindByThumbprint, certificateNameOrThumbprint, false);
            }

            var c = store.Certificates.Find(X509FindType.FindBySerialNumber, certificateNameOrThumbprint, false);
            if (c != null)
            {
                if (c.Count > 0)
                {
                    foreach (var cc in c)
                    {
                        var s = cc.Thumbprint;
                        var sr = cc.Thumbprint.Insert(2, ":").Insert(5, ":").Insert(8, ":").Insert(11, ":").Insert(14, ":").Insert(17, ":").Insert(20, ":").Insert(23, ":").Insert(26, ":").Insert(29, ":");
                    }
                }
            }

            c = store.Certificates.Find(X509FindType.FindBySubjectKeyIdentifier, "0f4f1061ec2b45dd791679a7b0b7be3fe52c3867", false);
            if (c != null)
            {
                if (c.Count > 0)
                {
                    foreach (var cc in c)
                    {
                        var s = cc.Thumbprint;
                        var sr = cc.Thumbprint.Insert(2, ":").Insert(5, ":").Insert(8, ":").Insert(11, ":").Insert(14, ":").Insert(17, ":").Insert(20, ":").Insert(23, ":").Insert(26, ":").Insert(29, ":");
                    }
                }
            }



            // Если не нашли по отпечатку или параметр не похож на отпечаток, попробуем найти по имени
            if (certificates == null || certificates.Count == 0)
            {
                certificates = store.Certificates.Find(X509FindType.FindBySerialNumber, "76b730f65ff602a5487b7ceac6b19cd8", false);
            }

            certificates = store.Certificates;

            if (certificates.Count > 0)
            {
                foreach (X509Certificate2 cert in certificates)
                {
                    /*   Console.WriteLine($"Found certificate: {cert.SubjectName.Name}");
                       Console.WriteLine($"ThumbPrint: {cert.Thumbprint}"); // Отпечаток без разделителей
                       // Для отпечатка с двоеточиями:
                       Console.WriteLine($"ThumbPrint (separators): {cert.Thumbprint.Insert(2, ":").Insert(5, ":").Insert(8, ":").Insert(11, ":").Insert(14, ":").Insert(17, ":").Insert(20, ":").Insert(23, ":").Insert(26, ":").Insert(29, ":")}");
                       Console.WriteLine($"Expired date {cert.GetExpirationDateString()}");
                       Console.WriteLine("---");
                       Console.WriteLine($"Found certificate: {cert.SubjectName.Name}");*/
                    var dt = cert.GetExpirationDateString();
                    var sn = cert.GetSerialNumberString();
                    var st = cert.Thumbprint;
                    var sr = cert.Thumbprint.Insert(2, ":").Insert(5, ":").Insert(8, ":").Insert(11, ":").Insert(14, ":").Insert(17, ":").Insert(20, ":").Insert(23, ":").Insert(26, ":").Insert(29, ":");
                    sr = sr + "";
                }
            }
            else
            {
                Console.WriteLine($"Certifiucate '{certificateNameOrThumbprint}' not found.");
            }
        }
    }
    /*
        public static void Main(string[] args)
        {
            // Пример использования:
            // 1. Поиск по имени (например, "My Client Certificate")
            // GetCertificateThumbprint("My Client Certificate");

            // 2. Поиск по отпечатку (замените на реальный отпечаток)
         //   GetCertificateThumbprint("92a367f45033f5386c7f05282a12c6454ff0dd33");
        }*/
}