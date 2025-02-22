#include<bits/stdc++.h>
using namespace std;
int main()
{
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    
    string s;
    getline(cin,s);

    int n = s.length();

    if(s[0] == '/' && s[1] == '/')
    {
        cout<<"Comment"<<endl;
    }
    else if(s[0] == '/' && s[1] == '*')
    {
        if(s[n-2] == '*' && s[n-1] == '/')
        {
            cout<<"Comment"<<endl;
        }

        else
        {
            cout<<"Not a Comment"<<endl;
        }
    }

    else
    {
        cout<<"Not a Comment"<<endl;
    }
    return 0;
}