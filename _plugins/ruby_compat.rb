# tainted? was removed in Ruby 3.2 but Liquid 4.x still calls it.
# It was always a no-op (returned false) in Ruby 3.x, so restoring it is safe.
if RUBY_VERSION >= "3.2"
  class String
    def tainted?
      false
    end
  end
end
