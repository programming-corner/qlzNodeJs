#include <napi.h>
#include <string>
#include <iostream>
#include "quicklz.h"
#include <malloc.h>

// Napi::String qlz_compress_magic(const Napi::CallbackInfo& info) {
//     Napi::Env env = info.Env();
//     std::string toCompress = (std::string) info[0].ToString();
//     double size = info[1].As<Napi::Number>().DoubleValue();
//     static unsigned char *destination = new unsigned char[size+400]();
//     // and do not forget to delete it later
//     qlz_state_compress  *state_compress = (qlz_state_compress *)malloc(sizeof(qlz_state_compress));
//     const void * data = toCompress.c_str();
//     size_t x = qlz_compress(data, (char*)destination ,toCompress.length(), state_compress);
//     std::string  s = "";
//    for (int i = 0; i < x ; i++) {
//         s += (destination[i]>>4)&0x0f;
//         s += destination[i]&0x0f;
//      }
//     delete[] destination;
//     return Napi::String::New(env, s);
// }

Napi::String qlz_compress_magic(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();
    std::string toCompress = (std::string) info[0].ToString();
    double size = info[1].As<Napi::Number>().DoubleValue();
    static unsigned char buffer1[10000000] = {0};
    // std::cout << "buffer1 before reinterpret_cast intial:  "<<buffer1[0]<< "\n";
    unsigned char * destination = &buffer1[0];//reinterpret_cast<char*>(buffer1);
    // std::cout << "destination before compress intial:  "<< *destination << "\n";
    qlz_state_compress  *state_compress = (qlz_state_compress *)malloc(sizeof(qlz_state_compress));
    const void * data = toCompress.c_str();
//    std::cout << "Before :  "<< size<<"   destination !: "<<destination<<"\n" ;
    size_t x = qlz_compress(data, (char*)destination ,toCompress.length(), state_compress);
    // std::cout << "buffer1 before intial char :  "<<buffer1<< "\n";
    // std::cout << "after Des :    destination !: "<<destination<<"\n" ;
    // std::cout << "compressed size x:  "<<x<< "\n";
    // std::cout << "size :  "<<size<< "\n";
    std::string  s = "";
    // std::cout <<"=====================================================================================\n";
   for (int i = 0; i < x ; i++) {
        s += (buffer1[i]>>4)&0x0f;
        s += buffer1[i]&0x0f;
     }
    // std::cout <<"=====================================================================================\n";
    // std::cout << "string :  "<<s<< "\n";
    return Napi::String::New(env, s);
}
Napi::String qlz_decompress_c(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();
    std::string toDeCompress = (std::string) info[0].ToString();
    char buffer1[100] = {0};
    char* destination = reinterpret_cast<char*>(buffer1);

    qlz_state_decompress  *state_decompress = (qlz_state_decompress *)malloc(sizeof(qlz_state_decompress));

    const char * data = toDeCompress.c_str();
   // const void * destination = toCompress.c_str();

    std::cout << "Before : "<<data<<"   destination !: "<<destination<<"\n" ;
    size_t x = qlz_decompress(data, destination , state_decompress);
    std::cout << "After :  "<<x <<"toDeCompress   "<<toDeCompress<<"   destination !: "<< destination <<"\n";
    // return new `Napi::String` value
    return Napi::String::New(env, destination);
}

Napi::Object Init(Napi::Env env, Napi::Object exports) {
    exports.Set(Napi::String::New(env, "qlz_compress_c"), Napi::Function::New(env, qlz_compress_magic));
    exports.Set(Napi::String::New(env, "qlz_decompress_c"), Napi::Function::New(env, qlz_decompress_c));
    return exports;
}

NODE_API_MODULE(qlz, Init)